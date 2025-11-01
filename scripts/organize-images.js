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

const fs = require('fs');
const path = require('path');

const CONFIG = {
  imagesBaseDir: path.join(__dirname, '..', 'public', 'images'),
  sourceDirs: [
    path.join(__dirname, '..', 'components'),
    path.join(__dirname, '..', 'app'),
  ],
  fileExtensions: ['.tsx', '.ts'],
};

// Map of image descriptions to organize by section
const IMAGE_DESCRIPTIONS = new Map();

/**
 * Extract image paths with their descriptions/context
 */
function extractImageReferences(filePath, content) {
  const references = [];
  
  // Pattern 1: Object with title/img or caption/src
  const objectPattern = /\{(?:[^}]*?(?:title|caption|alt|description)\s*[:=]\s*["']([^"']+)["'])(?:[^}]*?(?:img|src|image|imageSrc)\s*[:=]\s*["']([^"']+)["'])/gi;
  let match;
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
function getSection(description, imgPath) {
  const desc = (description || '').toLowerCase();
  const path = (imgPath || '').toLowerCase();
  
  if (desc.includes('highlight') || path.includes('highlight')) return 'highlights';
  if (desc.includes('exterior') || path.includes('exterior') || desc.includes('front') || desc.includes('rear') || desc.includes('side')) return 'exterior';
  if (desc.includes('interior') || path.includes('interior') || desc.includes('dashboard') || desc.includes('seat')) return 'interior';
  if (desc.includes('performance') || path.includes('performance') || desc.includes('engine') || desc.includes('transmission')) return 'performance';
  if (desc.includes('safety') || path.includes('safety') || desc.includes('airbag') || desc.includes('adas')) return 'safety';
  if (desc.includes('convenience') || path.includes('convenience') || desc.includes('connectivity') || desc.includes('tech')) return 'convenience';
  if (desc.includes('knight') || path.includes('knight')) return 'knight';
  if (desc.includes('spec') || path.includes('spec')) return 'specs';
  
  return null; // No specific section
}

/**
 * Organize images by model/section
 */
function organizeImages() {
  console.log('🔍 Scanning codebase for image references...\n');
  
  const imageMap = new Map(); // path -> {description, filePath, section, model}
  
  function scanDirectory(dir) {
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
            console.error(`Error reading ${fullPath}:`, err.message);
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
function reorganizeImages(imageMap) {
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
    let newPath;
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
function updateReferences(imageMap) {
  console.log('🔄 Updating file references...\n');
  
  const filesToUpdate = new Map();
  
  // Group by file
  for (const [imgPath, data] of imageMap.entries()) {
    if (!data.newPath) continue;
    
    if (!filesToUpdate.has(data.filePath)) {
      filesToUpdate.set(data.filePath, []);
    }
    filesToUpdate.get(data.filePath).push({
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
function main() {
  const imageMap = organizeImages();
  
  console.log(`Found ${imageMap.size} image references\n`);
  
  // Show organization plan
  const byModel = new Map();
  for (const [path, data] of imageMap.entries()) {
    if (!byModel.has(data.model)) {
      byModel.set(data.model, new Map());
    }
    if (!byModel.get(data.model).has(data.section || 'root')) {
      byModel.get(data.model).set(data.section || 'root', []);
    }
    byModel.get(data.model).get(data.section || 'root').push(data);
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

