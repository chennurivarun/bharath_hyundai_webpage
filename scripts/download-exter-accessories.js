const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Product data with names and image URLs
const products = [
  { name: "BODY COVER PREMIUM", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-178-1024x1024.png" },
  { name: "BODY SIDE MOULDING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-179-1024x1024.png" },
  { name: "BUMPER CORNER PROTECTOR", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-180-1024x1024.png" },
  { name: "DOOR CLADDING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-181-1024x1024.png" },
  { name: "DOOR EDGE GUARD", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-182-1024x1024.png" },
  { name: "FRONT & REAR SCOOP", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-183-1024x1024.png" },
  { name: "MUD GUARD", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-184-1024x1024.png" },
  { name: "TWIN HOOD SCOOP", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-185-1024x1024.png" },
  { name: "3D BOOT MAT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-186-1024x1024.png" },
  { name: "HEAD REST CUSHIONS", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-187-1024x1024.png" },
  { name: "SCUFF PLATES", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-188-1024x1024.png" },
  { name: "SUNSHADE ROWER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-190-1024x1024.png" },
  { name: "A302HI", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-149-1024x1024.png" },
  { name: "REVERSE CAMERA", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-150-1024x1024.png" },
  { name: "SONY XM CHANNEL", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-152-1024x1024.png" },
  { name: "GT0609C", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-162-1024x1024.png" },
];

const outputDir = path.join(__dirname, '../public/images/accessories/exter');

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

