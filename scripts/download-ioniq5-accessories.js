const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const url = 'https://bharathyundai.com/ioniq-5-accessories/';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'accessories', 'ioniq5');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Accessories mapping based on the page content
const accessories = [
  { name: 'BODY COVER - PREMIUM', keywords: ['body', 'cover', 'premium'] },
  { name: 'CARPET MAT - PREMIUM', keywords: ['carpet', 'mat', 'premium'] },
  { name: 'BOOT MAT CARPET', keywords: ['boot', 'mat', 'carpet'] },
  { name: 'FRONT TRUNK LINER', keywords: ['front', 'trunk', 'liner'] },
  { name: 'DASH CAM', keywords: ['dash', 'cam'] },
];

function downloadImage(imageUrl, filename) {
  return new Promise((resolve, reject) => {
    const protocol = imageUrl.startsWith('https') ? https : http;
    const filePath = path.join(outputDir, filename);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`✓ Already exists: ${filename}`);
      resolve();
      return;
    }

    protocol.get(imageUrl, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✓ Downloaded: ${filename}`);
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      } else {
        console.log(`✗ Failed to download ${filename}: ${response.statusCode}`);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      console.log(`✗ Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractImagesFromHTML(html) {
  const images = [];
  
  // Extract all img tags
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  const foundImages = new Set();
  
  while ((match = imgRegex.exec(html)) !== null) {
    let imageUrl = match[1];
    
    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      imageUrl = 'https://bharathyundai.com' + imageUrl;
    } else if (!imageUrl.startsWith('http')) {
      imageUrl = 'https://bharathyundai.com/' + imageUrl;
    }
    
    // Skip common non-product images
    if (imageUrl.includes('logo') || 
        imageUrl.includes('icon') || 
        imageUrl.includes('banner') ||
        imageUrl.includes('header') ||
        imageUrl.includes('footer') ||
        imageUrl.includes('social') ||
        imageUrl.includes('whatsapp')) {
      continue;
    }
    
    foundImages.add(imageUrl);
  }
  
  // Try to match images with accessories
  accessories.forEach(accessory => {
    const sanitizedName = sanitizeFilename(accessory.name);
    let matched = false;
    
    for (const imageUrl of foundImages) {
      const urlLower = imageUrl.toLowerCase();
      const matchesKeyword = accessory.keywords.some(keyword => 
        urlLower.includes(keyword.toLowerCase())
      );
      
      if (matchesKeyword || urlLower.includes(sanitizedName)) {
        const filename = `${sanitizedName}.png`;
        images.push({
          url: imageUrl,
          filename: filename,
          name: accessory.name
        });
        matched = true;
        break;
      }
    }
    
    // If no match found, try to find by position or use a placeholder
    if (!matched) {
      console.log(`⚠ No image found for: ${accessory.name}`);
    }
  });
  
  return images;
}

// Fetch the page
console.log('Fetching page...');
const protocol = url.startsWith('https') ? https : http;

protocol.get(url, (response) => {
  let html = '';
  
  response.on('data', (chunk) => {
    html += chunk;
  });
  
  response.on('end', () => {
    console.log('Page fetched. Extracting images...');
    
    // Extract images
    const images = extractImagesFromHTML(html);
    
    if (images.length === 0) {
      console.log('No images found. Trying alternative extraction...');
      
      // Alternative: Extract all images and try to match them
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      const allImages = [];
      
      while ((match = imgRegex.exec(html)) !== null) {
        let imageUrl = match[1];
        if (imageUrl.startsWith('/')) {
          imageUrl = 'https://bharathyundai.com' + imageUrl;
        } else if (!imageUrl.startsWith('http')) {
          imageUrl = 'https://bharathyundai.com/' + imageUrl;
        }
        
        // Skip common non-product images
        if (imageUrl.includes('logo') || 
            imageUrl.includes('icon') || 
            imageUrl.includes('banner') ||
            imageUrl.includes('header') ||
            imageUrl.includes('footer') ||
            imageUrl.includes('social') ||
            imageUrl.includes('whatsapp')) {
          continue;
        }
        
        allImages.push(imageUrl);
      }
      
      console.log(`Found ${allImages.length} potential images`);
      console.log('Sample images:', allImages.slice(0, 10));
      
      // Try to download based on known patterns from the page
      const knownImages = [
        { url: allImages.find(img => img.includes('body') && img.includes('cover')) || allImages[2], name: 'BODY COVER - PREMIUM' },
        { url: allImages.find(img => img.includes('carpet') && img.includes('mat')) || allImages[3], name: 'CARPET MAT - PREMIUM' },
        { url: allImages.find(img => img.includes('boot') && img.includes('mat')) || allImages[4], name: 'BOOT MAT CARPET' },
        { url: allImages.find(img => img.includes('front') && img.includes('trunk')) || allImages[5], name: 'FRONT TRUNK LINER' },
        { url: allImages.find(img => img.includes('dash') || img.includes('cam')) || allImages[6], name: 'DASH CAM' },
      ].filter(item => item.url); // Remove items without URLs
      
      // Download known images
      const downloadPromises = knownImages.map(item => {
        const filename = `${sanitizeFilename(item.name)}.png`;
        return downloadImage(item.url, filename).catch(() => {
          console.log(`Failed to download ${item.name}`);
        });
      });
      
      Promise.all(downloadPromises).then(() => {
        console.log('\nDownload complete!');
        console.log(`Images saved to: ${outputDir}`);
      });
      
      return;
    }
    
    // Download all matched images
    console.log(`\nFound ${images.length} images to download\n`);
    
    const downloadPromises = images.map(item => {
      return downloadImage(item.url, item.filename).catch(() => {
        console.log(`Failed to download ${item.name}`);
      });
    });
    
    Promise.all(downloadPromises).then(() => {
      console.log('\nDownload complete!');
      console.log(`Images saved to: ${outputDir}`);
    });
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err.message);
});

