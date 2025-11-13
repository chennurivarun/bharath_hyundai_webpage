const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const IMAGE_MAPPING = {
  highlights: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/venue-n-line-inner-kv-desk-banner.jpg', name: 'venue-n-line-inner-kv-desk-banner.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/led-drl.jpg', name: 'led-drl.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/diamond-cut-alloy-wheel.jpg', name: 'diamond-cut-alloy-wheel.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/steering-wheel.jpg', name: 'steering-wheel.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/gear-shift-knob.jpg', name: 'gear-shift-knob.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/exterior-banner.jpg', name: 'exterior-banner.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/led-sequential-turn-indicators.jpg', name: 'led-sequential-turn-indicators.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/twin-tip-exhaust.jpg', name: 'twin-tip-exhaust.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/high-mounted-stop-lap.jpg', name: 'high-mounted-stop-lap.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/interior-banner.jpg', name: 'interior-banner.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/drive-mode-select.jpg', name: 'drive-mode-select.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/interior-gear-hift-knob.jpg', name: 'interior-gear-hift-knob.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/paddle-shifters.jpg', name: 'paddle-shifters.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/smartsense-banner.jpg', name: 'smartsense-banner.jpg' },
  ],
  exterior: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/quad-beam-led.jpg', name: 'quad-beam-led.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/diamond-cut-alloy-wheel.jpg', name: 'diamond-cut-alloy-wheel.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/high-mounted-stop-lamp.jpg', name: 'high-mounted-stop-lamp.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/LED_sequential_lights.jpg', name: 'LED_sequential_lights.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/bridge-type-roof-rails.jpg', name: 'bridge-type-roof-rails.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/dark-chrome-radiator-grille-with-N-Line-emblem.jpg', name: 'dark-chrome-radiator-grille-with-N-Line-emblem.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/venuenlineextfront1.jpg', name: 'venuenlineextfront1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/venuenlineextrear1.jpg', name: 'venuenlineextrear1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/exterior/venuenlineextside1.jpg', name: 'venuenlineextside1.jpg' },
  ],
  interior: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/interior-banner.jpg', name: 'interior-banner.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/N-Line-exclusive-steering-wheel.jpg', name: 'N-Line-exclusive-steering-wheel.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/sporty-black-leather-seats-with-N-branding.jpg', name: 'sporty-black-leather-seats-with-N-branding.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/coffee-table-centre-console-with-surround-ambient-lighting.jpg', name: 'coffee-table-centre-console-with-surround-ambient-lighting.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/crashpad-with-VENUE-branding.jpg', name: 'crashpad-with-VENUE-branding.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/sporty-metal-pedals.jpg', name: 'sporty-metal-pedals.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/interior/spacious-cabin-ample-head-room.jpg', name: 'spacious-cabin-ample-head-room.jpg' },
  ],
  performance: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/venuenlinebigimg1.jpg', name: 'venuenlinebigimg1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/venuenlineengbig1.jpg', name: 'venuenlineengbig1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/venuenlinesmallimg1.jpg', name: 'venuenlinesmallimg1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/venuenlinesmallimg3.jpg', name: 'venuenlinesmallimg3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/performance/venuenlinesmallimg2.jpg', name: 'venuenlinesmallimg2.jpg' },
  ],
  safety: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/pre-booking/smartsense-banner.jpg', name: 'smartsense-banner.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/front-parking-sensors.jpg', name: 'front-parking-sensors.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/electronic-parking-brake-with-auto-hold.jpg', name: 'electronic-parking-brake-with-auto-hold.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/hill-start-assist-control.jpg', name: 'hill-start-assist-control.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/6-airbags-standard.jpg', name: '6-airbags-standard.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/all_wheel_disc_brake.jpg', name: 'all_wheel_disc_brake.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/child-seat-anchor.jpg', name: 'child-seat-anchor.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/designed-for-the-connected-era-banner.jpg', name: 'designed-for-the-connected-era-banner.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/rear-cross-traffic-collision-avoidance-assist.jpg', name: 'rear-cross-traffic-collision-avoidance-assist.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/driver-attention-warning.jpg', name: 'driver-attention-warning.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/safe-exit-warning.jpg', name: 'safe-exit-warning.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/smart-cruise-control.jpg', name: 'smart-cruise-control.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/lane-following-assist.jpg', name: 'lane-following-assist.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/forward-collision-avoidance-assist-car-fca-car.jpg', name: 'forward-collision-avoidance-assist-car-fca-car.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/forward-collision-avoidance-assist-pedestrian-FCA-Ped.jpg', name: 'forward-collision-avoidance-assist-pedestrian-FCA-Ped.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/forward-collision-avoidance-assist-cycle.jpg', name: 'forward-collision-avoidance-assist-cycle.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/forward-collision-avoidance-assist-junction-turning.jpg', name: 'forward-collision-avoidance-assist-junction-turning.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/blind-spot-collision-warning.jpg', name: 'blind-spot-collision-warning.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/lane-departure-warning.jpg', name: 'lane-departure-warning.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/parking-collision-avoidance-assist-rear.jpg', name: 'parking-collision-avoidance-assist-rear.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/high-beam-assist.jpg', name: 'high-beam-assist.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/leading-vehicle-departure-alert.jpg', name: 'leading-vehicle-departure-alert.jpg' },
  ],
  convenience: [
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlinebigimg-2.jpg', name: 'venuenlinebigimg-2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimgzm-1.jpg', name: 'venuenlineimgzm-1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimgzm-2.jpg', name: 'venuenlineimgzm-2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimgzm-3.jpg', name: 'venuenlineimgzm-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimgzm-4.jpg', name: 'venuenlineimgzm-4.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimgzm-5.jpg', name: 'venuenlineimgzm-5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimgzm-6.jpg', name: 'venuenlineimgzm-6.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimg-1.jpg', name: 'venuenlineimg-1.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimg-2.jpg', name: 'venuenlineimg-2.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimg-3.jpg', name: 'venuenlineimg-3.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimg-4.jpg', name: 'venuenlineimg-4.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimg-5.jpg', name: 'venuenlineimg-5.jpg' },
    { url: 'https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/venue-n-line/safety/venuenlineimg-6.jpg', name: 'venuenlineimg-6.jpg' },
  ],
};

const outputDir = path.join(__dirname, '..', 'public', 'images', 'cars', 'venue-nline');

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
  console.log('Starting download of Venue N Line images...');
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

