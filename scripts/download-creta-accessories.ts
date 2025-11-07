import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Product {
  name: string;
  url: string;
}

// Product data with names and image URLs
const products: Product[] = [
  { name: "BODY COVER PREMIUM", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-165-1024x1024.png" },
  { name: "BODY SIDE MOULDING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-166-1024x1024.png" },
  { name: "BUMPER CORNER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-167-1024x1024.png" },
  { name: "DOOR CLADDING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-168-1024x1024.png" },
  { name: "DOOR HANDLE KEYLESS", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-169-1024x1024.png" },
  { name: "TAIL LAMP GARNISH", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-170-1024x1024.png" },
  { name: "WINDOW BEADING", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-171-1024x1024.png" },
  { name: "TWIN HOOD SCOOP", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-172-1024x1024.png" },
  { name: "3D BOOT MAT", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-173-1024x1024.png" },
  { name: "SEAT COVERS", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-174-1024x1024.png" },
  { name: "CUP HOLDER CASTER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-175-1024x1024.png" },
  { name: "STEERING WHEEL COVER", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-176-1024x1024.png" },
  { name: "A302HI", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-149-1024x1024.png" },
  { name: "REVERSE CAMERA", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-150-1024x1024.png" },
  { name: "GTO609C", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-162-1024x1024.png" },
  { name: "SONY XM CHANNEL", url: "https://bharathyundai.com/wp-content/uploads/2025/09/image-152-1024x1024.png" },
];

const outputDir = path.join(__dirname, '..', 'public', 'images', 'accessories', 'creta');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-z0-9]/gi, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        const location = response.headers.location;
        if (location) {
          return downloadImage(location, filepath)
            .then(resolve)
            .catch(reject);
        }
        return reject(new Error('Redirect without location header'));
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

async function downloadAll(): Promise<void> {
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
      const err = error as Error;
      console.error(`  ✗ Error downloading ${product.name}:`, err.message);
    }
  }
  
  console.log('\nDownload complete!');
}

downloadAll().catch(console.error);

