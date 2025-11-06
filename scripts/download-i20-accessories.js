const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Product data with names and image URLs - based on actual page content
const products = [
  { name: "BODY COVER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-191-1024x1024.png" },
  { name: "LOWER BUMPER GARNISH", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-192-1024x1024.png" },
  { name: "TAIL LAMP GARNISH", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-193-1024x1024.png" },
  { name: "DOOR HANDLE GARNISH", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-194-1-1024x1024.png" },
  { name: "DOOR SIDE MOLDING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-195-1024x1024.png" },
  { name: "WINDOW BEADING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-196-1024x1024.png" },
  { name: "MUD GUARD", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-197-1024x1024.png" },
  { name: "SIDE SKIRT EXTEENDER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-198-1024x1024.png" },
  { name: "HEADREST CUSHION", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-199-1024x1024.png" },
  { name: "STEERING WHEEL COVER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-200-1024x1024.png" },
  { name: "SEAT COVER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-201-1024x1024.png" },
  { name: "DASH CAM", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-202-1024x1024.png" },
  { name: "BLAUPUNKT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-163-1024x1024.png" },
  { name: "GT0609C", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-162-1024x1024.png" },
  { name: "REVERSE CAMERA", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-150-1024x1024.png" },
];

const outputDir = path.join(__dirname, '../public/images/accessories/i20');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function sanitizeFileName(name) {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function downloadAll() {
  console.log(`Downloading ${products.length} images...`);
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const fileName = `${sanitizeFileName(product.name)}.png`;
    const filePath = path.join(outputDir, fileName);
    
    try {
      console.log(`[${i + 1}/${products.length}] Downloading: ${product.name}`);
      await downloadImage(product.url, filePath);
      console.log(`  ✓ Saved: ${fileName}`);
    } catch (error) {
      console.error(`  ✗ Error downloading ${product.name}:`, error.message);
    }
  }
  
  console.log('\nDownload complete!');
}

downloadAll();

