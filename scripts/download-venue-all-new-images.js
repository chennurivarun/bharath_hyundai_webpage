const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const IMAGE_MAPPING = {
  highlights: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/alloy-wheel.jpg', name: 'alloy-wheel.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/dual-tone-interior-theme.jpg', name: 'dual-tone-interior-theme.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/flat-centre-console.jpg', name: 'flat-centre-console.jpg' },
  ],
  exterior: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venuefirstbigimage1.jpg', name: 'venuefirstbigimage1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/bridge-type-roof-rails.jpg', name: 'bridge-type-roof-rails.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/rear-horizon-led-tail-lamps.jpg', name: 'rear-horizon-led-tail-lamps.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextfront1.jpg', name: 'venueextfront1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextside1.jpg', name: 'venueextside1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Exterior/pc/venueextrear1.jpg', name: 'venueextrear1.jpg' },
  ],
  interior: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintbigimg-1.jpg', name: 'venueintbigimg-1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/venue_2nd-row-spacious-cabin.jpg', name: 'venue_2nd-row-spacious-cabin.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/d-cut-steering-wheel.jpg', name: 'd-cut-steering-wheel.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintsmallimg-3.jpg', name: 'venueintsmallimg-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/terrazzo-textured-crash-pad-finish.jpg', name: 'terrazzo-textured-crash-pad-finish.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintsmallimage5.jpg', name: 'venueintsmallimage5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintsmallimg-6.jpg', name: 'venueintsmallimg-6.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintbigimg-2.jpg', name: 'venueintbigimg-2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg1.jpg', name: 'venueintimg1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg2.jpg', name: 'venueintimg2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg3.jpg', name: 'venueintimg3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg5.jpg', name: 'venueintimg5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Interior/pc/venueintimg4.jpg', name: 'venueintimg4.jpg' },
  ],
  performance: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/u2engperformimg1.jpg', name: 'u2engperformimg1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/kappagdiengperformimg2.jpg', name: 'kappagdiengperformimg2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/kappaengperformimg3.jpg', name: 'kappaengperformimg3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/indicatorvenue1.jpg', name: 'indicatorvenue1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/venueperformsmallimg2.jpg', name: 'venueperformsmallimg2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Performance/pc/venueperformsmallimg3.jpg', name: 'venueperformsmallimg3.jpg' },
  ],
  safety: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-10.jpg', name: 'venue_safety_image-10.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image.jpg', name: 'venue_safety_image.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-2.jpg', name: 'venue_safety_image-2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-3.jpg', name: 'venue_safety_image-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-4.jpg', name: 'venue_safety_image-4.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-5.jpg', name: 'venue_safety_image-5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-6.jpg', name: 'venue_safety_image-6.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-7.jpg', name: 'venue_safety_image-7.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-8.jpg', name: 'venue_safety_image-8.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue/safety/venue_safety_image-9.jpg', name: 'venue_safety_image-9.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-8.jpg', name: 'venuesafetysmallimg-8.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-3.jpg', name: 'venuesafetysmallimg-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-4.jpg', name: 'venuesafetysmallimg-4.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-5.jpg', name: 'venuesafetysmallimg-5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-6.jpg', name: 'venuesafetysmallimg-6.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuesafetysmallimg-7.jpg', name: 'venuesafetysmallimg-7.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuetabimg2.jpg', name: 'venuetabimg2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Safety/pc/venuetabimg1.jpg', name: 'venuetabimg1.jpg' },
  ],
  convenience: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/pre-booking/venueinteriorimg-pc.jpg', name: 'venueinteriorimg-pc.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimgsmall-4.jpg', name: 'venueconvimgsmall-4.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimgsmall-5.jpg', name: 'venueconvimgsmall-5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-9.jpg', name: 'venuetabimg-9.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimgsmall-1.jpg', name: 'venueconvimgsmall-1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimgsmall-2.jpg', name: 'venueconvimgsmall-2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimgsmall-3.jpg', name: 'venueconvimgsmall-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-1.jpg', name: 'venuetabimg-1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venueconvimg-1.jpg', name: 'venueconvimg-1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-3.jpg', name: 'venuetabimg-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-4.jpg', name: 'venuetabimg-4.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-7.jpg', name: 'venuetabimg-7.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-5.jpg', name: 'venuetabimg-5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-6.jpg', name: 'venuetabimg-6.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Venue/Convenience/pc/venuetabimg-8.jpg', name: 'venuetabimg-8.jpg' },
  ],
};

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
  console.log('Starting download of All New Venue images...');
  let total = 0;
  let success = 0;
  let failed = 0;

  for (const [category, images] of Object.entries(IMAGE_MAPPING)) {
    console.log(`\nDownloading ${category} images (${images.length} files)...`);
    for (const img of images) {
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
  }

  console.log(`\n\nDownload complete!`);
  console.log(`Total: ${total}, Success: ${success}, Failed: ${failed}`);
}

main().catch(console.error);

