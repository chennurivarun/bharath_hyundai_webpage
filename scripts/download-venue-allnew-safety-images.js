const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const IMAGES = [
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-8.jpg', name: 'venuesafetysmallimg-8.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-3.jpg', name: 'venuesafetysmallimg-3.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-4.jpg', name: 'venuesafetysmallimg-4.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-5.jpg', name: 'venuesafetysmallimg-5.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-6.jpg', name: 'venuesafetysmallimg-6.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-7.jpg', name: 'venuesafetysmallimg-7.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuetabimg2.jpg', name: 'venuetabimg2.jpg' },
  { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuetabimg1.jpg', name: 'venuetabimg1.jpg' },
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'cars', 'venue-all-new');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting download of Venue All New safety images...');
  let total = 0;
  let success = 0;
  let failed = 0;

  for (const img of IMAGES) {
    total++;
    const destPath = path.join(outputDir, img.name);
    try {
      await downloadFile(img.url, destPath);
      console.log(`✓ ${img.name}`);
      success++;
    } catch (error) {
      console.error(`✗ ${img.name}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n\nDownload complete!`);
  console.log(`Total: ${total}, Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);

