/*
  i20 image downloader and manifest generator
  - Parses provided URL blob with concatenations and category headers
  - Downloads into public/images/cars/i20/
  - Generates public/images/cars/i20/manifest.json with categories and captions from filenames
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'cars', 'i20');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const RAW_INPUT = `
i20

knight edition
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightbig.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackinserts.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackseats.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-metalpedals.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightalloywheel.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-emblem.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-Knight-frontmattelogo-highres-final.jpg

highilets
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20highlight_tab1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20interiordashbig1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20dashcam.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20sportytailgate.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20sportytailgate.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightsunproof.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20highlight_small1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/i20highsmall2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/i20highsmall2.jpg
Exterior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe_exttab11.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe_exttab1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe_exttab2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20sidestudiobig.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe_exttab5.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe_exttab6.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe_exttab7.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20finbig.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe1_ext.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe2_ext.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe3_ext.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20pe4_ext.jpg
Interior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/big-image1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20peint2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/smart_entry_with_push_button_startstop.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/Front_rear_usb_charger.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/Fully_automatic_temperature_control.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/leather_wrapped_steering_wheel.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/leather_wrapped_steering_wheel.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/mob/i20_RearSeats.jpg
Performance
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/engine_1120x600_01.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20pe_per2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20pe_per1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/Performance_544x360_01.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/Performance_544x360_02.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/Performance_544x360_03.jpg
Safety
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20safetybig1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20safetybig2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20hacbig.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/safety_airbags.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/Safety-Bottom1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/safety_isofix.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/i20highsmall4.jpg
Convenience
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/1120x600_interior_3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/i20highsmall3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/convenience_electric_sunroof_544x360.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/convenience_start_stop_544x360.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/convenience_cruise_control_544x360.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/Hyundai-i20-premium-hatchback-Convenience-Page-Bottom-7.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/544x360_interior_12.jpg
`;

const CATEGORY_HEADERS = [
  { key: 'knight', aliases: ['knight edition', 'knight'] },
  { key: 'highlights', aliases: ['highilets', 'highlights'] },
  { key: 'exterior', aliases: ['exterior'] },
  { key: 'interior', aliases: ['interior'] },
  { key: 'performance', aliases: ['performance'] },
  { key: 'safety', aliases: ['safety'] },
  { key: 'convenience', aliases: ['convenience'] },
];

function splitConcatenatedUrls(text) {
  const normalized = text.replace(/https:\/\//g, '\nhttps://').split(/\s+/).filter(Boolean);
  const urlRegex = /^https:\/\/www\.hyundai\.com\/.*\.(?:jpg|jpeg|png|webp|avif)$/i;
  return normalized.filter((u) => urlRegex.test(u));
}

function detectCategory(line) {
  const lc = line.trim().toLowerCase();
  for (const c of CATEGORY_HEADERS) {
    if (c.aliases.some((a) => lc === a)) return c.key;
  }
  return null;
}

function parseByCategory(raw) {
  const lines = raw.split(/\r?\n/);
  let current = 'highlights';
  const buckets = { knight: [], highlights: [], exterior: [], interior: [], performance: [], safety: [], convenience: [] };
  for (const line of lines) {
    const cat = detectCategory(line);
    if (cat) { current = cat; continue; }
    const urls = splitConcatenatedUrls(line);
    for (const u of urls) buckets[current].push(u);
  }
  for (const key of Object.keys(buckets)) {
    const seen = new Set();
    buckets[key] = buckets[key].filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
  }
  return buckets;
}

function sanitizeFileName(name) {
  return decodeURIComponent(name)
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function toFileNameFromUrl(url, i = 0) {
  const last = url.split('/').pop() || `image-${i}.jpg`;
  return sanitizeFileName(last);
}

function toCaptionFromUrl(url) {
  const last = decodeURIComponent(url.split('/').pop() || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return last;
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function absoluteRedirect(currentUrl, location) {
  try {
    const loc = location.trim();
    if (/^https?:\/\//i.test(loc)) return loc;
    const u = new URL(currentUrl);
    if (loc.startsWith('/')) return `${u.protocol}//${u.host}${loc}`;
    const base = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
    return base + loc;
  } catch {
    return location;
  }
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(encodeURI(url), (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const follow = absoluteRedirect(url, res.headers.location);
        https.get(follow, (res2) => {
          if (res2.statusCode !== 200) { file.close(); fs.unlink(destPath, () => {}); return reject(new Error(`HTTP ${res2.statusCode} for redirect ${follow}`)); }
          res2.pipe(file); file.on('finish', () => file.close(resolve));
        }).on('error', (e) => { file.close(); fs.unlink(destPath, () => {}); reject(e); });
      } else if (res.statusCode !== 200) {
        file.close(); fs.unlink(destPath, () => {}); return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      } else { res.pipe(file); file.on('finish', () => file.close(resolve)); }
    }).on('error', (err) => { file.close(); fs.unlink(destPath, () => {}); reject(err); });
  });
}

async function main() {
  const categories = parseByCategory(RAW_INPUT);
  ensureDir(OUTPUT_DIR);
  const manifest = { generatedAt: new Date().toISOString(), basePath: '/images/cars/i20/', categories: {} };
  for (const [key, list] of Object.entries(categories)) {
    const items = [];
    for (let i = 0; i < list.length; i++) {
      const url = list[i];
      const fileName = toFileNameFromUrl(url, i);
      const localPath = path.join(OUTPUT_DIR, fileName);
      try {
        if (!fs.existsSync(localPath)) {
          // eslint-disable-next-line no-await-in-loop
          await downloadFile(url, localPath);
        }
        items.push({ title: toCaptionFromUrl(url), file: fileName, src: `/images/cars/i20/${fileName}`, origin: url });
      } catch (e) {
        console.warn(`[skip] ${url} → ${fileName}: ${e.message}`);
      }
    }
    manifest.categories[key] = items;
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Saved ${MANIFEST_PATH}`);
}

main().catch((e) => { console.error(e); process.exit(1); });


