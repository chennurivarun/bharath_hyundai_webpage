const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Product data with names and image URLs
const products = [
  { name: "ALLOY WHEEL R18 DC 45.72CM", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-153-1024x1024.png" },
  { name: "BODY SIDE MOULDING - BLACK", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-154-1024x1024.png" },
  { name: "DOOR EDGE GUARD", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-155-1024x1024.png" },
  { name: "ORVM GARNISH", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-156-1024x1024.png" },
  { name: "TAIL LAMP GARNISH - BLACK", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-157-1024x1024.png" },
  { name: "3D MAT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-158-1024x1024.png" },
  { name: "ARMREST CUSHION", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-159-1024x1024.png" },
  { name: "NECKREST WITH N - LINE", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-160-1024x1024.png" },
  { name: "SEAT BELT COVER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-161-1024x1024.png" },
  { name: "A302HI", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-149-1024x1024.png" },
  { name: "SONY CHANNEL STEREO", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-152-1024x1024.png" },
  { name: "GT0609C", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-162-1024x1024.png" },
  { name: "BLAUPUNKT - PURE", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-163-1024x1024.png" },
];

const outputDir = path.join(__dirname, '../public/images/accessories/creta-nline');

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

