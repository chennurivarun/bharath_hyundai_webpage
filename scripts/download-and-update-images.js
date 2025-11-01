#!/usr/bin/env node

/**
 * Image Downloader and Link Updater
 * 
 * This script:
 * 1. Finds all external image URLs in TSX/TS files
 * 2. Organizes them by page/component hierarchy
 * 3. Downloads them with rate limiting
 * 4. Saves them in organized folder structure
 * 5. Updates all references automatically
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const CONFIG = {
  // Rate limiting: delay between downloads (ms)
  downloadDelay: 500,
  // Max concurrent downloads
  maxConcurrent: 3,
  // Timeout for downloads (ms)
  timeout: 30000,
  // Base directory for images
  imagesBaseDir: path.join(__dirname, '..', 'public', 'images'),
  // Source files to scan
  sourceDirs: [
    path.join(__dirname, '..', 'components'),
    path.join(__dirname, '..', 'app'),
  ],
  // File extensions to scan
  fileExtensions: ['.tsx', '.ts'],
};

// Track download progress
let downloadQueue = [];
let activeDownloads = 0;
let completedDownloads = 0;
let failedDownloads = 0;
const urlToLocalPath = new Map();

/**
 * Generate a clean filename from URL
 */
function generateFilename(url, context) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    // Try to extract meaningful filename
    let filename = pathParts[pathParts.length - 1];
    
    // Handle URLs without clear filenames (like /documents/d/global/verna-highlights-sporty)
    if (!filename || filename.length < 3 || filename === 'global' || filename === 'd') {
      // Extract meaningful parts from URL path
      const meaningfulParts = pathParts.filter(p => 
        p.length > 3 && 
        !['documents', '20120', '33945', '33939'].includes(p)
      );
      
      if (meaningfulParts.length > 0) {
        filename = meaningfulParts.join('-');
      } else {
        // Use last part that's not a number
        const lastPart = pathParts[pathParts.length - 1];
        const secondLast = pathParts[pathParts.length - 2];
        filename = secondLast && secondLast !== 'd' ? `${secondLast}-${lastPart}` : lastPart || 'image';
      }
    }
    
    // Handle query parameters (common in CDN URLs)
    if (filename.includes('?')) {
      filename = filename.split('?')[0];
    }
    
    // Clean filename
    filename = filename
      .replace(/%20/g, '-')  // Replace URL-encoded spaces
      .replace(/%2B/g, '-')  // Replace URL-encoded plus
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Ensure it has an extension
    if (!filename.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)) {
      // Try to infer from URL path or default to jpg
      const contentType = url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)/i);
      const ext = contentType ? contentType[0].toLowerCase() : '.jpg';
      filename += ext;
    }
    
    // Limit filename length
    if (filename.length > 100) {
      const ext = path.extname(filename);
      filename = filename.substring(0, 90) + ext;
    }
    
    return filename;
  } catch (e) {
    // Fallback
    const hash = url.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return `image-${Math.abs(hash)}.jpg`;
  }
}

/**
 * Determine folder structure based on source file
 */
function getImageFolder(sourceFile) {
  const relativePath = path.relative(process.cwd(), sourceFile);
  
  // Extract model/car name from file path
  if (relativePath.includes('verna')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'verna');
  } else if (relativePath.includes('creta')) {
    if (relativePath.includes('nline') || relativePath.includes('n-line')) {
      return path.join(CONFIG.imagesBaseDir, 'cars', 'creta-nline');
    } else if (relativePath.includes('ev') || relativePath.includes('electric')) {
      return path.join(CONFIG.imagesBaseDir, 'cars', 'creta-ev');
    }
    return path.join(CONFIG.imagesBaseDir, 'cars', 'creta');
  } else if (relativePath.includes('venue')) {
    if (relativePath.includes('nline') || relativePath.includes('n-line')) {
      return path.join(CONFIG.imagesBaseDir, 'cars', 'venue-nline');
    }
    return path.join(CONFIG.imagesBaseDir, 'cars', 'venue');
  } else if (relativePath.includes('exter')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'exter');
  } else if (relativePath.includes('tucson')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'tucson');
  } else if (relativePath.includes('alcazar')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'alcazar');
  } else if (relativePath.includes('aura')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'aura');
  } else if (relativePath.includes('i20')) {
    if (relativePath.includes('nline') || relativePath.includes('n-line')) {
      return path.join(CONFIG.imagesBaseDir, 'cars', 'i20-nline');
    }
    return path.join(CONFIG.imagesBaseDir, 'cars', 'i20');
  } else if (relativePath.includes('ioniq')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'ioniq5');
  } else if (relativePath.includes('nios')) {
    return path.join(CONFIG.imagesBaseDir, 'cars', 'nios');
  }
  
  // Default: extract from directory structure
  const parts = relativePath.split(path.sep);
  const modelIndex = parts.findIndex(p => p === 'components' || p === 'app');
  if (modelIndex !== -1 && parts[modelIndex + 1]) {
    const modelName = parts[modelIndex + 1].replace(/\.tsx?$/, '');
    return path.join(CONFIG.imagesBaseDir, 'cars', modelName);
  }
  
  return path.join(CONFIG.imagesBaseDir, 'cars', 'unknown');
}

/**
 * Extract external image URLs from file content
 */
function extractImageUrls(filePath, content) {
  const urls = [];
  const urlPatterns = [
    // Direct src attributes
    /src\s*[=:]\s*["'](https?:\/\/[^"']+)["']/gi,
    // Background images
    /backgroundImage\s*[=:]\s*["']url\(['"]?(https?:\/\/[^"')]+)['"]?\)/gi,
    // URL patterns in arrays/objects (including URLs without extensions)
    /["'](https?:\/\/[^"']+)(?:\?[^"']*)?["']/gi,
    // JSX style URLs
    /\{["'](https?:\/\/[^"']+)(?:\?[^"']*)?["']\}/gi,
  ];
  
  const seenUrls = new Set();
  
  urlPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      let url = match[1].replace(/['"]/g, '').trim();
      
      // Skip if already processed
      if (seenUrls.has(url)) continue;
      
          // Filter out non-image URLs (but allow URLs that might be images without extensions)
          if (url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)/i) || 
              (url.includes('image') || 
               url.includes('photo') ||
               url.includes('picture') ||
               url.includes('documents') ||  // Common CDN path
               url.includes('uploads') ||     // Common upload path
               url.includes('hyundaimotor') || // Hyundai CDN
               url.includes('hyundai.com')) && 
              !url.match(/\/find-a-car\//) &&  // Exclude HTML pages
              !url.match(/\/find-a-car$/) &&    // Exclude HTML pages
              !url.match(/\/story\//) &&        // Exclude story pages
              !url.match(/\/price/) &&          // Exclude price pages
              !url.match(/\/specification/) &&  // Exclude specification pages
              !url.match(/\/features$/) &&       // Exclude features pages
              !url.match(/\/highlights$/) &&    // Exclude highlights pages
              !url.match(/\/exterior$/) &&       // Exclude exterior pages
              !url.match(/\/interior$/) &&       // Exclude interior pages
              !url.match(/\/performance$/) &&    // Exclude performance pages
              !url.match(/\/safety$/) &&         // Exclude safety pages
              !url.match(/\/convenience$/)) {    // Exclude convenience pages
            // Skip if it's clearly not an image (like a PDF, HTML page, etc.)
            if (!url.match(/\.(pdf|html|htm|xml|json|js|css|txt)$/i)) {
              seenUrls.add(url);
              urls.push({
                url: url,
                originalMatch: match[0],
                lineNumber: content.substring(0, match.index).split('\n').length,
              });
            }
          }
    }
  });
  
  return urls;
}

/**
 * Download an image
 */
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    // Ensure directory exists
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Skip if file already exists
    if (fs.existsSync(destPath)) {
      console.log(`⊘ Skipped (exists): ${path.basename(destPath)}`);
      resolve(destPath);
      return;
    }
    
    const file = fs.createWriteStream(destPath);
    const request = protocol.get(url, {
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*;q=0.8',
      },
    });
    
    request.on('response', (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
        // Follow redirect
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }
      
      // Check content type
      const contentType = response.headers['content-type'];
      if (contentType && !contentType.startsWith('image/') && !contentType.includes('octet-stream')) {
        file.close();
        if (fs.existsSync(destPath)) {
          fs.unlinkSync(destPath);
        }
        reject(new Error(`Not an image: ${contentType}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(err);
    });
    
    request.on('timeout', () => {
      request.destroy();
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(new Error(`Timeout downloading ${url}`));
    });
    
    file.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      reject(err);
    });
  });
}

/**
 * Process download queue
 */
async function processDownloadQueue() {
  while (downloadQueue.length > 0 || activeDownloads > 0) {
    if (activeDownloads < CONFIG.maxConcurrent && downloadQueue.length > 0) {
      const item = downloadQueue.shift();
      activeDownloads++;
      
      downloadImage(item.url, item.destPath)
        .then(() => {
          completedDownloads++;
          urlToLocalPath.set(item.url, item.localPath);
          console.log(`✓ Downloaded: ${path.basename(item.destPath)} (${completedDownloads}/${downloadQueue.length + completedDownloads + failedDownloads})`);
        })
        .catch((err) => {
          failedDownloads++;
          console.error(`✗ Failed: ${item.url} - ${err.message}`);
        })
        .finally(() => {
          activeDownloads--;
          // Delay before next download
          setTimeout(() => {
            processDownloadQueue();
          }, CONFIG.downloadDelay);
        });
    } else {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

/**
 * Scan files for external image URLs
 */
function scanFiles() {
  const imageMap = new Map(); // filePath -> [{url, localPath, originalMatch}]
  
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
            const urls = extractImageUrls(fullPath, content);
            
            if (urls.length > 0) {
              imageMap.set(fullPath, {
                filePath: fullPath,
                urls: urls.map(item => {
                  const folder = getImageFolder(fullPath);
                  const filename = generateFilename(item.url, fullPath);
                  // Generate relative path from public/images
                  // folder already includes CONFIG.imagesBaseDir, so we just need relative path from there
                  const relativePath = path.relative(CONFIG.imagesBaseDir, path.join(folder, filename));
                  let localPath = `/images/${relativePath.replace(/\\/g, '/')}`;
                  // Fix double "cars" issue if it occurs
                  localPath = localPath.replace(/\/cars\/cars\//g, '/cars/');
                  const destPath = path.join(folder, filename);
                  
                  return {
                    ...item,
                    localPath,
                    destPath,
                    folder,
                    filename,
                  };
                }),
              });
            }
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
 * Update file references
 */
function updateFileReferences(imageMap) {
  let updatedFiles = 0;
  
  for (const [filePath, data] of imageMap.entries()) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    for (const urlData of data.urls) {
      const localPath = urlToLocalPath.get(urlData.url);
      if (localPath) {
        // Replace URL with local path
        // Handle different quote styles and contexts
        const escapedUrl = urlData.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Pattern 1: Direct URL in quotes (src="url" or src='url')
        const patterns = [
          // src="url" or src='url'
          new RegExp(`(src\\s*[=:]\\s*["'])${escapedUrl}(["'])`, 'gi'),
          // In array/object: "url" or 'url'
          new RegExp(`(["{]\\s*["'])${escapedUrl}(["']\\s*[,}])`, 'gi'),
          // Standalone: "url" or 'url'
          new RegExp(`([^\\w])["']${escapedUrl}(["'])`, 'gi'),
          // Direct URL without quotes context
          new RegExp(`(^|[^\\w])${escapedUrl}([^\\w]|$)`, 'g'),
        ];
        
        patterns.forEach((pattern, idx) => {
          const newContent = content.replace(pattern, (match, before, after) => {
            // For pattern 1: preserve src= and quotes
            if (idx === 0) {
              return `${before}${localPath}${after}`;
            }
            // For pattern 2: preserve array/object syntax
            if (idx === 1) {
              return `${before}${localPath}${after}`;
            }
            // For pattern 3: preserve quotes
            if (idx === 2) {
              return `${before}"${localPath}"${after}`;
            }
            // For pattern 4: add quotes if replacing standalone URL
            return `${before}"${localPath}"${after}`;
          });
          
          if (newContent !== content) {
            content = newContent;
            modified = true;
          }
        });
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      updatedFiles++;
      console.log(`✓ Updated: ${filePath}`);
    }
  }
  
  return updatedFiles;
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scanning files for external image URLs...\n');
  
  const imageMap = scanFiles();
  
  if (imageMap.size === 0) {
    console.log('No external image URLs found.');
    return;
  }
  
  console.log(`Found ${imageMap.size} files with external images\n`);
  
  // Collect all unique URLs and prepare download queue
  const urlSet = new Set();
  for (const data of imageMap.values()) {
    for (const urlData of data.urls) {
      if (!urlSet.has(urlData.url)) {
        urlSet.add(urlData.url);
        downloadQueue.push({
          url: urlData.url,
          destPath: urlData.destPath,
          localPath: urlData.localPath,
        });
      }
    }
  }
  
  console.log(`📥 Queueing ${downloadQueue.length} unique images for download...\n`);
  
  // Show what will be downloaded
  console.log('Images to download:');
  downloadQueue.forEach((item, idx) => {
    console.log(`  ${idx + 1}. ${item.url}`);
    console.log(`     → ${item.localPath}`);
  });
  console.log('');
  
  // Start downloads
  console.log('🚀 Starting downloads (with rate limiting)...\n');
  await processDownloadQueue();
  
  // Wait for all downloads to complete
  while (activeDownloads > 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Download Summary:`);
  console.log(`   Completed: ${completedDownloads}`);
  console.log(`   Failed: ${failedDownloads}`);
  console.log(`   Total: ${downloadQueue.length}\n`);
  
  if (completedDownloads > 0) {
    console.log('🔄 Updating file references...\n');
    const updated = updateFileReferences(imageMap);
    console.log(`\n✓ Updated ${updated} files with new local paths`);
  }
  
  console.log('\n✨ Done!');
}

// Run script
main().catch(console.error);

