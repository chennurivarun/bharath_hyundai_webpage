const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Product data with names and image URLs
const products = [
  { name: "1L Engine Coolant PRE - MIX", url: "https://bharathyundai.com/wp-content/uploads/2025/09/3643-ACF79IH001-1-L-ENGINE-COOLANT-PRE-MIX-F-removebg-preview.png" },
  { name: "1L Brake fluid DOT 3", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-255.png" },
  { name: "1L Brake fluid DOT 4 LV", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-256.png" },
  { name: "240g Balancing weight - stick", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-257.png" },
  { name: "25ml Engine Sealant", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-258.png" },
  { name: "30ml Dashboard Polish", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-259.png" },
  { name: "3D BOOT MAT", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-260-rbmytkug7mfhiq3ala52pcxzblk4xlzz63m0yhkvse.png" },
  { name: "5 - L Engine Coolant Pre - Mix", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-261.png" },
  { name: "70GM - RUST BUST", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-262.png" },
  { name: "ANTI - SKID MAT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-263.png" },
  { name: "Body Cover - Premium", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-264.png" },
  { name: "Body Side Moulding", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-265.png" },
  { name: "Cabin LED Light", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-266.png" },
  { name: "Car back seat organizar", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-267.png" },
  { name: "Car care kit", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-268.png" },
  { name: "Car Document Organizer", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-269.png" },
  { name: "Car Perfume - Citrus Breeze", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-270.png" },
  { name: "Carpet MAT Designer", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-271.png" },
  { name: "Comfort Kit", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-272.png" },
  { name: "DOOR CLADDING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-273.png" },
  { name: "Door Edge Guard", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-274.png" },
  { name: "Door Side Vent", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-275.png" },
  { name: "Door Visor", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-276.png" },
  { name: "Door Handle Key", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-277.png" },
  { name: "Heat control sunroof - 50", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-278.png" },
  { name: "Heat control sunroof -80", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-279.png" },
  { name: "Hood Branding Creta", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-280.png" },
  { name: "Key Cover", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-281.png" },
  { name: "Mudflap", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-282.png" },
  { name: "NFC Card Holder", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-283.png" },
  { name: "ORVM Garnish", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-284.png" },
  { name: "Tail Lamp Garnish", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-285.png" },
  { name: "Twin Hood Scoop", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-286.png" },
  { name: "Seat Cover", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-287-1.png" },
  { name: "Dual layer MAT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-288.png" },
  { name: "Front Trunk Liner", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-289.png" },
  { name: "Neck Rest & Cushion kit", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-255-1.png" },
  { name: "Pet Protection Cover", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-256-1.png" },
  { name: "Premium Boot MAT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-1.png" },
  { name: "Screen Protector", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-2.png" },
  { name: "Seat Belt Cover", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-3.png" },
  { name: "Sporty Pedal Cover", url: "https://bharathyundai.com/wp-content/uploads/elementor/thumbs/image-4-1-rbngaevkn0zk45n48rywzr9c46btd2szxricpyaxuk.png" },
  { name: "Sun Shade (Row A + Pear)", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-5.png" },
  { name: "MH7 DASH CAM", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-6.png" },
];

const outputDir = path.join(__dirname, '../public/images/accessories/creta-ev');

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

