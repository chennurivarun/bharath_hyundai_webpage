const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Product data with names and image URLs
const products = [
  { name: "3D BOOT MAT", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-137-rcbgvdllfp5y8ueic8i6qg20svulbx4nuucs16vmbo.png" },
  { name: "BODY COVER - PREMIUM", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-138-rcbhtaly1hlf6b4xaeak7dxsgeoe2qrzipsifml7t0.png" },
  { name: "BODY SIDE MOULDING", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-139-rcbinrjll5b1j8vkd2g6j74pp2hqliqqpj45hjes3o.png" },
  { name: "DOOR EDGE GUARD", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-140-rcbiux3dlr3lwehgl5ryie50gn8b6l570xv6zcswqs.png" },
  { name: "DOOR EDGE GUARD", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-141-rcbj4on0lsguikatkdqfexfemr3l5dwt19usgubo3o.png" },
  { name: "DOOR VISOR", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-142-rcbjbf5dl1otpyik8ak6a88bw5wabanjym62a8c3ic.png" },
  { name: "FRONT BUMPER", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-143-rcbjh18oefdh24d0g7wyob8fm087a7xueefggq0gck.png" },
  { name: "REAR BUMPER GRANISH", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-144-rcbjocfhk1drcxqprdoi2gthxw6z5gyoql3eu767yc.png" },
  { name: "ALCAZAR SUNSHADE A+C+R", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-145-1024x1024.png" },
  { name: "SUNSHADE C+R", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-146-1024x1024.png" },
  { name: "SCREEN PROTECTOR", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-147-1024x1024.png" },
  { name: "SPORTY PEDAL COVER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-148-1024x1024.png" },
  { name: "A302H3", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-149-1024x1024.png" },
  { name: "REVERSE CAMERA", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-150-1024x1024.png" },
  { name: "SONY - X S - NW12002", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-151-1024x1024.png" },
  { name: "SONY CHANNEL STEREO", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-152-1024x1024.png" },
];

const outputDir = path.join(__dirname, '../public/images/accessories/alcazar');

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

