#!/usr/bin/env node

/**
 * Comprehensive Image Downloader and Organizer
 * 
 * Downloads images from external URLs, organizes them by model/section,
 * ensures no duplicates, and updates all references with proper naming
 * that matches image descriptions.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Configuration
const CONFIG = {
  downloadDelay: 500,
  maxConcurrent: 3,
  timeout: 30000,
  imagesBaseDir: path.join(__dirname, '..', 'public', 'images'),
  sourceDirs: [
    path.join(__dirname, '..', 'components'),
    path.join(__dirname, '..', 'app'),
  ],
  fileExtensions: ['.tsx', '.ts'],
};

// Track all downloads
let downloadQueue = [];
let activeDownloads = 0;
let completedDownloads = 0;
let failedDownloads = 0;
const urlToLocalPath = new Map();
const urlToDescription = new Map(); // Map URLs to their descriptions/context

/**
 * Generate descriptive filename from URL and context
 */
function generateDescriptiveFilename(url, context, description) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    // Extract meaningful parts from URL
    let filename = pathParts[pathParts.length - 1];
    
    // Handle URLs without clear filenames
    if (!filename || filename.length < 3) {
      const meaningfulParts = pathParts.filter(p => 
        p.length > 3 && 
        !['documents', '20120', '33945', '33939', 'content', 'dam', 'hyundai', 'in', 'en', 'data', 'find-a-car'].includes(p)
      );
      filename = meaningfulParts.join('-') || 'image';
    }
    
    // Remove query parameters
    if (filename.includes('?')) {
      filename = filename.split('?')[0];
    }
    
    // Clean filename
    filename = filename
      .replace(/%20/g, '-')
      .replace(/%2B/g, '-')
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Add description hints if available
    if (description) {
      const descClean = description
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 30);
      if (descClean && !filename.includes(descClean)) {
        filename = `${descClean}-${filename}`;
      }
    }
    
    // Ensure extension
    if (!filename.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i)) {
      const contentType = url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)/i);
      const ext = contentType ? contentType[0].toLowerCase() : '.jpg';
      filename += ext;
    }
    
    // Limit length
    if (filename.length > 120) {
      const ext = path.extname(filename);
      filename = filename.substring(0, 110) + ext;
    }
    
    return filename;
  } catch (e) {
    const hash = url.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return `image-${Math.abs(hash)}.jpg`;
  }
}

/**
 * Determine folder structure based on URL and context
 */
function getImageFolder(url, sourceFile) {
  const relativePath = path.relative(process.cwd(), sourceFile);
  const urlStr = url.toLowerCase();
  
  // Extract model from URL path
  let model = 'unknown';
  let section = '';
  
  // Determine model from URL
  if (urlStr.includes('/i20/')) {
    if (urlStr.includes('n-line') || urlStr.includes('nline')) {
      model = 'i20-nline';
    } else {
      model = 'i20';
    }
  } else if (urlStr.includes('/creta/')) {
    if (urlStr.includes('n-line') || urlStr.includes('nline')) {
      model = 'creta-nline';
    } else if (urlStr.includes('electric') || urlStr.includes('ev')) {
      model = 'creta-ev';
    } else {
      model = 'creta';
    }
  } else if (urlStr.includes('/venue/')) {
    if (urlStr.includes('n-line') || urlStr.includes('nline')) {
      model = 'venue-nline';
    } else {
      model = 'venue';
    }
  } else if (urlStr.includes('/verna/') || urlStr.includes('verna')) {
    model = 'verna';
  } else if (urlStr.includes('/exter/') || urlStr.includes('exter')) {
    model = 'exter';
  } else if (urlStr.includes('/tucson/') || urlStr.includes('tucson')) {
    model = 'tucson';
  } else if (urlStr.includes('/alcazar/') || urlStr.includes('alcazar')) {
    model = 'alcazar';
  } else if (urlStr.includes('/aura/') || urlStr.includes('aura')) {
    model = 'aura';
  } else if (urlStr.includes('/nios/') || urlStr.includes('nios')) {
    model = 'nios';
  } else if (urlStr.includes('/ioniq') || urlStr.includes('ioniq')) {
    model = 'ioniq5';
  }
  
  // Extract section from URL
  if (urlStr.includes('/highlights/')) section = 'highlights';
  else if (urlStr.includes('/exterior/')) section = 'exterior';
  else if (urlStr.includes('/interior/')) section = 'interior';
  else if (urlStr.includes('/performance/')) section = 'performance';
  else if (urlStr.includes('/safety/')) section = 'safety';
  else if (urlStr.includes('/convenience/')) section = 'convenience';
  else if (urlStr.includes('/specification/')) section = 'specs';
  else if (urlStr.includes('/features/')) section = 'features';
  
  // Fallback to file path if URL doesn't specify
  if (model === 'unknown') {
    if (relativePath.includes('verna')) model = 'verna';
    else if (relativePath.includes('creta')) {
      if (relativePath.includes('nline') || relativePath.includes('n-line')) model = 'creta-nline';
      else if (relativePath.includes('ev') || relativePath.includes('electric')) model = 'creta-ev';
      else model = 'creta';
    }
    else if (relativePath.includes('venue')) {
      if (relativePath.includes('nline') || relativePath.includes('n-line')) model = 'venue-nline';
      else model = 'venue';
    }
    else if (relativePath.includes('exter')) model = 'exter';
    else if (relativePath.includes('tucson')) model = 'tucson';
    else if (relativePath.includes('alcazar')) model = 'alcazar';
    else if (relativePath.includes('aura')) model = 'aura';
    else if (relativePath.includes('nios')) model = 'nios';
    else if (relativePath.includes('i20')) {
      if (relativePath.includes('nline') || relativePath.includes('n-line')) model = 'i20-nline';
      else model = 'i20';
    }
    else if (relativePath.includes('ioniq')) model = 'ioniq5';
  }
  
  return path.join(CONFIG.imagesBaseDir, 'cars', model);
}

/**
 * Extract image URLs with context (description, title, etc.)
 */
function extractImageUrlsWithContext(filePath, content) {
  const urls = [];
  const seenUrls = new Set();
  
  // Pattern 1: In arrays/objects with title/caption
  // Matches: { title: "...", img: "url" } or { caption: "...", src: "url" }
  const objectPattern = /\{(?:[^}]*?(?:title|caption|alt|description)\s*[:=]\s*["']([^"']+)["'])(?:[^}]*?(?:img|src|image|imageSrc)\s*[:=]\s*["'](https?:\/\/[^"']+)["'])/gi;
  let match;
  while ((match = objectPattern.exec(content)) !== null) {
    const description = match[1];
    const url = match[2];
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      urls.push({
        url,
        description,
        context: 'object',
        lineNumber: content.substring(0, match.index).split('\n').length,
      });
    }
  }
  
  // Pattern 2: Direct src with alt
  const srcAltPattern = /<(?:img|Image)\s+[^>]*?src\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*?alt\s*=\s*["']([^"']+)["']/gi;
  while ((match = srcAltPattern.exec(content)) !== null) {
    const url = match[1];
    const alt = match[2];
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      urls.push({
        url,
        description: alt,
        context: 'img-tag',
        lineNumber: content.substring(0, match.index).split('\n').length,
      });
    }
  }
  
  // Pattern 3: Generic URL patterns
  const urlPatterns = [
    /src\s*[=:]\s*["'](https?:\/\/[^"']+)["']/gi,
    /["'](https?:\/\/[^"']+\.(jpg|jpeg|png|webp|avif|gif|svg)(?:\?[^"']*)?)["']/gi,
  ];
  
  urlPatterns.forEach(pattern => {
    while ((match = pattern.exec(content)) !== null) {
      const url = match[1].replace(/['"]/g, '').trim();
      
      if (seenUrls.has(url)) continue;
      
      // Filter for image URLs
      if (url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)/i) || 
          (url.includes('documents') || url.includes('uploads') || 
           url.includes('hyundaimotor') || url.includes('hyundai.com/content/dam'))) {
        // Skip HTML pages
        if (!url.match(/\/find-a-car\//) && 
            !url.match(/\/find-a-car$/) &&
            !url.match(/\/story\//) &&
            !url.match(/\/price/) &&
            !url.match(/\.(pdf|html|htm|xml|json|js|css|txt)$/i)) {
          seenUrls.add(url);
          urls.push({
            url,
            description: null,
            context: 'generic',
            lineNumber: content.substring(0, match.index).split('\n').length,
          });
        }
      }
    }
  });
  
  return urls;
}

/**
 * Download image with better error handling
 */
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    // Clean URL first - ensure it's a full URL
    let cleanUrl = String(url).trim().replace(/\s+/g, '');
    
    // Debug: log URL details if it seems wrong
    if (cleanUrl.length < 10 || !cleanUrl.includes('://')) {
      console.error(`  Debug in downloadImage: url=${url}, cleanUrl=${cleanUrl}, length=${cleanUrl.length}`);
    }
    
    // Debug: log if URL seems incomplete
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      reject(new Error(`URL missing protocol: ${cleanUrl.substring(0, 80)}`));
      return;
    }
    
    let urlObj;
    try {
      urlObj = new URL(cleanUrl);
    } catch (e) {
      reject(new Error(`Invalid URL format: ${cleanUrl.substring(0, 80)} - ${e.message}`));
      return;
    }
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Skip if exists
    if (fs.existsSync(destPath)) {
      resolve(destPath);
      return;
    }
    
    const file = fs.createWriteStream(destPath);
    const request = protocol.get(cleanUrl, {
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
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        // Handle relative redirects
        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
          // Convert relative URL to absolute
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;
        }
        return downloadImage(redirectUrl, destPath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      const contentType = response.headers['content-type'];
      if (contentType && !contentType.startsWith('image/') && !contentType.includes('octet-stream')) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
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
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
    
    request.on('timeout', () => {
      request.destroy();
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(new Error('Timeout'));
    });
    
    file.on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
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
          console.log(`✓ [${completedDownloads}/${downloadQueue.length + completedDownloads + failedDownloads}] ${path.basename(item.destPath)}`);
        })
        .catch((err) => {
          failedDownloads++;
          const urlPreview = typeof item.url === 'string' ? item.url.substring(0, 80) : String(item.url).substring(0, 80);
          console.error(`✗ Failed: ${urlPreview}... - ${err.message}`);
          // Debug: log the actual URL being passed
          if (err.message.includes('missing protocol')) {
            console.error(`  Debug: item.url type: ${typeof item.url}, length: ${item.url ? item.url.length : 'null'}, startsWith http: ${item.url && item.url.startsWith('http')}`);
          }
        })
        .finally(() => {
          activeDownloads--;
          setTimeout(() => processDownloadQueue(), CONFIG.downloadDelay);
        });
    } else {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

/**
 * Scan files and extract URLs
 */
function scanFiles() {
  const imageMap = new Map();
  
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
            const urls = extractImageUrlsWithContext(fullPath, content);
            
            if (urls.length > 0) {
              imageMap.set(fullPath, {
                filePath: fullPath,
                urls: urls.map(item => {
                  const folder = getImageFolder(item.url, fullPath);
                  const filename = generateDescriptiveFilename(item.url, fullPath, item.description);
                  const relativePath = path.relative(CONFIG.imagesBaseDir, path.join(folder, filename));
                  let localPath = `/images/${relativePath.replace(/\\/g, '/')}`;
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
 * Load i20 URLs from PowerShell script
 */
function loadI20Urls() {
  const scriptPath = path.join(__dirname, '..', 'download-i20-images.ps1');
  if (!fs.existsSync(scriptPath)) return [];
  
  const content = fs.readFileSync(scriptPath, 'utf8');
  const urls = [];
  
  // Match URLs in quotes in PowerShell array format - handle multi-line
  const lines = content.split('\n');
  for (const line of lines) {
    // Match URLs in quotes
    const matches = line.matchAll(/"https:\/\/[^"]+\.(?:jpg|jpeg|png|webp|avif|gif|svg)[^"]*"/gi);
    for (const match of matches) {
      const url = match[0].replace(/^["']|["']$/g, '').trim();
      if (url && url.startsWith('http') && url.length > 20) {
        urls.push(url);
      }
    }
  }
  
  return [...new Set(urls)]; // Remove duplicates
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
        const escapedUrl = urlData.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const patterns = [
          new RegExp(`(src\\s*[=:]\\s*["'])${escapedUrl}(["'])`, 'gi'),
          new RegExp(`(["{]\\s*["'])${escapedUrl}(["']\\s*[,}])`, 'gi'),
          new RegExp(`([^\\w])["']${escapedUrl}(["'])`, 'gi'),
          new RegExp(`(^|[^\\w])${escapedUrl}([^\\w]|$)`, 'g'),
        ];
        
        patterns.forEach((pattern, idx) => {
          const newContent = content.replace(pattern, (match, before, after) => {
            if (idx === 0) return `${before}${localPath}${after}`;
            if (idx === 1) return `${before}${localPath}${after}`;
            if (idx === 2) return `${before}"${localPath}"${after}`;
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
  console.log('🔍 Scanning files and loading i20 URLs...\n');
  
  const imageMap = scanFiles();
  const i20Urls = loadI20Urls();
  
  // Add i20 URLs to map
  if (i20Urls.length > 0) {
    const i20Folder = path.join(CONFIG.imagesBaseDir, 'cars', 'i20');
    i20Urls.forEach(url => {
      // Ensure URL is clean and complete
      const cleanUrl = url.trim();
      if (!cleanUrl || !cleanUrl.startsWith('http')) {
        console.warn(`Skipping invalid URL: ${cleanUrl.substring(0, 50)}`);
        return;
      }
      
      // Verify URL is valid
      try {
        new URL(cleanUrl);
      } catch (e) {
        console.warn(`Skipping invalid URL format: ${cleanUrl.substring(0, 50)} - ${e.message}`);
        return;
      }
      
      const filename = generateDescriptiveFilename(cleanUrl, '', null);
      const destPath = path.join(i20Folder, filename);
      const relativePath = path.relative(CONFIG.imagesBaseDir, destPath);
      const localPath = `/images/${relativePath.replace(/\\/g, '/')}`;
      
      downloadQueue.push({
        url: cleanUrl, // Store cleaned URL
        destPath,
        localPath,
        description: null,
      });
    });
  }
  
  // Collect all unique URLs from scanned files
  const urlSet = new Set();
  for (const data of imageMap.values()) {
    for (const urlData of data.urls) {
      if (!urlSet.has(urlData.url)) {
        urlSet.add(urlData.url);
        // Ensure URL is clean before adding
        const cleanUrl = urlData.url.trim();
        if (cleanUrl && cleanUrl.startsWith('http')) {
          downloadQueue.push({
            url: cleanUrl,
            destPath: urlData.destPath,
            localPath: urlData.localPath,
            description: urlData.description,
          });
        }
      }
    }
  }
  
  if (downloadQueue.length === 0) {
    console.log('No external image URLs found.');
    return;
  }
  
  console.log(`📥 Queueing ${downloadQueue.length} unique images for download...\n`);
  
  // Show what will be downloaded
  console.log('Images to download:');
  downloadQueue.slice(0, 20).forEach((item, idx) => {
    console.log(`  ${idx + 1}. ${item.url.substring(0, 80)}...`);
    console.log(`     → ${item.localPath}`);
  });
  if (downloadQueue.length > 20) {
    console.log(`  ... and ${downloadQueue.length - 20} more`);
  }
  console.log('');
  
  console.log('🚀 Starting downloads (with rate limiting)...\n');
  await processDownloadQueue();
  
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

main().catch(console.error);

