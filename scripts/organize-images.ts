#!/usr/bin/env node

/**
 * Image Organizer & Reference Updater
 * 
 * This script:
 * 1. Organizes images by model/section hierarchy
 * 2. Matches images to descriptions from codebase
 * 3. Ensures no duplicates
 * 4. Updates all references with proper paths
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  imagesBaseDir: path.join(__dirname, '..', 'public', 'images'),
  sourceDirs: [
    path.join(__dirname, '..', 'components'),
    path.join(__dirname, '..', 'app'),
  ],
  fileExtensions: ['.tsx', '.ts'],
};

interface ImageReference {
  path: string;
  description: string;
  context: string;
  filePath: string;
}

interface ImageData {
  path: string;
  description: string;
  model: string | null;
  section: string | null;
  filePath: string;
  newPath?: string;
}

/**
 * Extract image paths with their descriptions/context
 */
function extractImageReferences(filePath: string, content: string): ImageReference[] {
  const references: ImageReference[] = [];
  
  // Pattern 1: Object with title/img or caption/src
  const objectPattern = /\{(?:[^}]*?(?:title|caption|alt|description)\s*[:=]\s*["']([^"']+)["'])(?:[^}]*?(?:img|src|image|imageSrc)\s*[:=]\s*["']([^"']+)["'])/gi;
  let match: RegExpExecArray | null;
  while ((match = objectPattern.exec(content)) !== null) {
    const description = match[1];
    const imgPath = match[2];
    if (imgPath && imgPath.startsWith('/images/')) {
      references.push({
        path: imgPath,
        description,
        context: 'object',
        filePath,
      });
    }
  }
  
  // Pattern 2: img src with alt
  const imgPattern = /<(?:img|Image)\s+[^>]*?src\s*=\s*["']([^"']+)["'][^>]*?alt\s*=\s*["']([^"']+)["']/gi;
  while ((match = imgPattern.exec(content)) !== null) {
    const imgPath = match[1];
    const alt = match[2];
    if (imgPath && imgPath.startsWith('/images/')) {
      references.push({
        path: imgPath,
        description: alt,
        context: 'img-tag',
        filePath,
      });
    }
  }
  
  return references;
}

/**
 * Determine section from description or path
 */
function getSection(description: string | null, imgPath: string | null): string | null {
  const desc = (description || '').toLowerCase();
  const pathStr = (imgPath || '').toLowerCase();
  
  if (desc.includes('highlight') || pathStr.includes('highlight')) return 'highlights';
  if (desc.includes('exterior') || pathStr.includes('exterior') || desc.includes('front') || desc.includes('rear') || desc.includes('side')) return 'exterior';
  if (desc.includes('interior') || pathStr.includes('interior') || desc.includes('dashboard') || desc.includes('seat')) return 'interior';
  if (desc.includes('performance') || pathStr.includes('performance') || desc.includes('engine') || desc.includes('transmission')) return 'performance';
  if (desc.includes('safety') || pathStr.includes('safety') || desc.includes('airbag') || desc.includes('adas')) return 'safety';
  if (desc.includes('convenience') || pathStr.includes('convenience') || desc.includes('connectivity') || desc.includes('tech')) return 'convenience';
  if (desc.includes('knight') || pathStr.includes('knight')) return 'knight';
  if (desc.includes('spec') || pathStr.includes('spec')) return 'specs';
  
  return null; // No specific section
}

/**
 * Organize images by model/section
 */
function organizeImages(): Map<string, ImageData> {
  console.log('🔍 Scanning codebase for image references...\n');
  
  const imageMap = new Map<string, ImageData>(); // path -> {description, filePath, section, model}
  
  function scanDirectory(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (CONFIG.fileExtensions.includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const refs = extractImageReferences(fullPath, content);
            
            refs.forEach(ref => {
              if (!imageMap.has(ref.path)) {
                // Extract model from path
                const pathParts = ref.path.split('/');
                const modelIndex = pathParts.indexOf('cars');
                const model = modelIndex !== -1 && pathParts[modelIndex + 1] ? pathParts[modelIndex + 1] : null;
                
                const section = getSection(ref.description, ref.path);
                
                imageMap.set(ref.path, {
                  path: ref.path,
                  description: ref.description,
                  model,
                  section,
                  filePath: ref.filePath,
                });
              }
            });
          } catch (err) {
            const error = err as Error;
            console.error(`Error reading ${fullPath}:`, error.message);
          }
        }
      }
    }
  }
  
  CONFIG.sourceDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      scanDirectory(dir);
    }
  });
  
  return imageMap;
}

/**
 * Create organized folder structure and move images
 */
function reorganizeImages(imageMap: Map<string, ImageData>): Map<string, ImageData> {
  console.log('📁 Organizing images by model/section...\n');
  
  let moved = 0;
  let skipped = 0;
  
  for (const [imgPath, data] of imageMap.entries()) {
    if (!data.model) {
      skipped++;
      continue;
    }
    
    const oldPath = path.join(CONFIG.imagesBaseDir, imgPath.replace(/^\/images\//, ''));
    
    if (!fs.existsSync(oldPath)) {
      skipped++;
      continue;
    }
    
    // Determine new path
    let newPath: string;
    if (data.section) {
      // Create section subfolder
      newPath = path.join(CONFIG.imagesBaseDir, 'cars', data.model, data.section, path.basename(oldPath));
    } else {
      // Keep in model folder
      newPath = path.join(CONFIG.imagesBaseDir, 'cars', data.model, path.basename(oldPath));
    }
    
    // Only move if different location
    if (oldPath !== newPath) {
      const newDir = path.dirname(newPath);
      if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir, { recursive: true });
      }
      
      // Check if target already exists
      if (fs.existsSync(newPath)) {
        // Compare file sizes to detect duplicates
        const oldSize = fs.statSync(oldPath).size;
        const newSize = fs.statSync(newPath).size;
        if (oldSize === newSize) {
          // Likely duplicate, remove old
          fs.unlinkSync(oldPath);
          skipped++;
          continue;
        }
      }
      
      fs.renameSync(oldPath, newPath);
      moved++;
      
      // Update path in imageMap
      const relativePath = path.relative(CONFIG.imagesBaseDir, newPath);
      const newLocalPath = `/images/${relativePath.replace(/\\/g, '/')}`;
      data.newPath = newLocalPath;
    }
  }
  
  console.log(`  Moved: ${moved} images`);
  console.log(`  Skipped: ${skipped} images\n`);
  
  return imageMap;
}

/**
 * Update file references
 */
function updateReferences(imageMap: Map<string, ImageData>): number {
  console.log('🔄 Updating file references...\n');
  
  const filesToUpdate = new Map<string, Array<{ old: string; new: string }>>();
  
  // Group by file
  for (const [imgPath, data] of imageMap.entries()) {
    if (!data.newPath) continue;
    
    if (!filesToUpdate.has(data.filePath)) {
      filesToUpdate.set(data.filePath, []);
    }
    filesToUpdate.get(data.filePath)!.push({
      old: imgPath,
      new: data.newPath,
    });
  }
  
  let updated = 0;
  
  for (const [filePath, changes] of filesToUpdate.entries()) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    changes.forEach(({ old, new: newPath }) => {
      if (content.includes(old)) {
        content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      updated++;
      console.log(`  ✓ Updated: ${path.basename(filePath)}`);
    }
  }
  
  console.log(`\n✓ Updated ${updated} files\n`);
  return updated;
}

/**
 * Main execution
 */
function main(): void {
  const imageMap = organizeImages();
  
  console.log(`Found ${imageMap.size} image references\n`);
  
  // Show organization plan
  const byModel = new Map<string | null, Map<string | null, ImageData[]>>();
  for (const [pathStr, data] of imageMap.entries()) {
    if (!byModel.has(data.model)) {
      byModel.set(data.model, new Map());
    }
    const modelMap = byModel.get(data.model)!;
    const sectionKey = data.section || 'root';
    if (!modelMap.has(sectionKey)) {
      modelMap.set(sectionKey, []);
    }
    modelMap.get(sectionKey)!.push(data);
  }
  
  console.log('Organization plan:');
  for (const [model, sections] of byModel.entries()) {
    console.log(`\n  ${model || 'unknown'}:`);
    for (const [section, images] of sections.entries()) {
      console.log(`    ${section || 'root'}: ${images.length} images`);
    }
  }
  console.log('');
  
  // Reorganize
  const reorganizedMap = reorganizeImages(imageMap);
  
  // Update references
  updateReferences(reorganizedMap);
  
  console.log('✨ Done!');
}

main();

