const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const url = 'https://bharathyundai.com/grand-i10-nios-3/';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'accessories', 'i10-nios');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Accessories mapping based on the page content
const accessories = [
  { name: 'BODY COVER', keywords: ['body', 'cover'] },
  { name: 'ORVM COVER GARNISH', keywords: ['orvm', 'cover', 'garnish'] },
  { name: 'WINDOW SIDE BEADING', keywords: ['window', 'beading'] },
  { name: 'DOOR HANDLE CHROME', keywords: ['door', 'handle', 'chrome'] },
  { name: 'HEAD LAMP GARNISH', keywords: ['head', 'lamp', 'garnish'] },
  { name: 'REAR BOOT GARNISH', keywords: ['rear', 'boot', 'garnish'] },
  { name: 'DECALS', keywords: ['decals'] },
  { name: 'SPOILER', keywords: ['spoiler'] },
  { name: 'STEERING WHEEL COVER', keywords: ['steering', 'wheel', 'cover'] },
  { name: 'CUSHION', keywords: ['cushion'] },
  { name: 'FULL FLOOR MAT', keywords: ['floor', 'mat'] },
  { name: 'SEAT COVER', keywords: ['seat', 'cover'] },
  { name: 'DASH CAM', keywords: ['dash', 'cam'] },
  { name: 'BLAUPUNKT', keywords: ['blaupunkt'] },
  { name: 'GT0609C', keywords: ['gt0609c', 'gt0609'] },
  { name: 'REVERSE CAMERA', keywords: ['reverse', 'camera'] },
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
      const altRegex = /<img[^>]+alt=["']([^"']+)["'][^>]*>/gi;
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
      console.log('Sample images:', allImages.slice(0, 5));
      
      // Try to download based on known patterns from the page
      // Based on the page structure, these are the likely image URLs
      const knownImages = [
        { url: allImages.find(img => img.includes('body') || img.includes('cover') && !img.includes('seat')) || allImages[2], name: 'BODY COVER' },
        { url: allImages.find(img => img.includes('orvm') || img.includes('garnish')) || allImages[3], name: 'ORVM COVER GARNISH' },
        { url: allImages.find(img => img.includes('window') || img.includes('beading')) || allImages[4], name: 'WINDOW SIDE BEADING' },
        { url: allImages.find(img => img.includes('door') && img.includes('handle')) || allImages[5], name: 'DOOR HANDLE CHROME' },
        { url: allImages.find(img => img.includes('head') && img.includes('lamp')) || allImages[6], name: 'HEAD LAMP GARNISH' },
        { url: allImages.find(img => img.includes('rear') || img.includes('boot')) || allImages[7], name: 'REAR BOOT GARNISH' },
        { url: allImages.find(img => img.includes('decals')) || allImages[8], name: 'DECALS' },
        { url: allImages.find(img => img.includes('spoiler')) || allImages[9], name: 'SPOILER' },
        { url: allImages.find(img => img.includes('steering')) || allImages[10], name: 'STEERING WHEEL COVER' },
        { url: allImages.find(img => img.includes('cushion')) || allImages[11], name: 'CUSHION' },
        { url: allImages.find(img => img.includes('floor') || img.includes('mat')) || allImages[12], name: 'FULL FLOOR MAT' },
        { url: allImages.find(img => img.includes('seat') && img.includes('cover')) || allImages[13], name: 'SEAT COVER' },
        { url: allImages.find(img => img.includes('dash') || img.includes('cam')) || allImages[14], name: 'DASH CAM' },
        { url: allImages.find(img => img.includes('blaupunkt')) || allImages[15], name: 'BLAUPUNKT' },
        { url: allImages.find(img => img.includes('gt0609') || img.includes('gt0609c')) || allImages[16], name: 'GT0609C' },
        { url: allImages.find(img => img.includes('reverse') || img.includes('camera')) || allImages[17], name: 'REVERSE CAMERA' },
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

