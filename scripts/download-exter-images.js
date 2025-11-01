/*
  EXTER image downloader and manifest generator

  - Parses the raw URL blob below (with accidental concatenations)
  - Downloads images into public/images/cars/exter/
  - Generates public/images/cars/exter/manifest.json with categories and captions

  Run: node scripts/download-exter-images.js
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'cars', 'exter');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

// Raw input provided by user, including headings and concatenated URLs
const RAW_INPUT = `
exter 
highilets
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature1.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/airbagsexterwithoutsticker.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature3.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature3.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature4.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/knightexterhighfeature5.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/extercngpc.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/smallimageexter2_5.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/smallimageexter2_4.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/800x530.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/800x530_1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/800x530_5.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/800x530_4.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/Highlights_sunroof.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/Highlights_sunroof.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterhighlightsdual%20camera.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/800x530_3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/last-small-section.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/new-small-image1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/new-small-image-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/small-image-new-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/last-small-section-new.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/Proposed-homepage/OTA%20update-800x530_14.jpg
Exterior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/externewimage2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterfront_pc_1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterside_pc_1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterroof%20rails.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_3.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_pc_1.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/exterior/exterrear_pc_2.jpg
Interior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exter_Interior_top_pc.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/footwelllighting.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/Interior_sunroof.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_Interior_small_2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_Interior_small_3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big6.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big4.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big2.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big3.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big1.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big5
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/interior/exter_interior_big5.jpg
Performance
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_big03.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_big02.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_small3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_small3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/performance/exterper_small1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterpaddleshifters.jpg
Safety
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/externewsafety.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/extersafety_01.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/externewconv2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/externewconve2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/extertpms.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/exter_safety_small2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/safety/exter_safety_small4.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/Highlights/externewimage4.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/extermultiUI.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterambientsoundnat.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/new-exter/exterrearac.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Exter/convenience/conv_exter_small1.jpg
`;

const CATEGORY_HEADERS = [
  { key: 'highlights', aliases: ['highilets', 'highlights'] },
  { key: 'exterior', aliases: ['exterior'] },
  { key: 'interior', aliases: ['interior'] },
  { key: 'performance', aliases: ['performance'] },
  { key: 'safety', aliases: ['safety'] },
  { key: 'convenience', aliases: ['convenience'] },
];

function splitConcatenatedUrls(text) {
  // Ensure each https occurrence starts a new line, then split by whitespace
  const normalized = text
    .replace(/https:\/\//g, '\nhttps://')
    .split(/\s+/)
    .filter(Boolean);
  // Keep only valid-looking jpg/jpeg/png/webp/avif URLs under hyundai.com
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
  const buckets = {
    highlights: [],
    exterior: [],
    interior: [],
    performance: [],
    safety: [],
    convenience: [],
  };
  for (const line of lines) {
    const cat = detectCategory(line);
    if (cat) {
      current = cat;
      continue;
    }
    const urls = splitConcatenatedUrls(line);
    for (const u of urls) buckets[current].push(u);
  }
  // Dedupe while preserving order
  for (const key of Object.keys(buckets)) {
    const seen = new Set();
    buckets[key] = buckets[key].filter((u) => {
      if (seen.has(u)) return false;
      seen.add(u);
      return true;
    });
  }
  return buckets;
}

function toFileNameFromUrl(url, indexWithinCat = 0) {
  const last = decodeURIComponent(url.split('/').pop() || `image-${indexWithinCat}.jpg`);
  return last.replace(/\s+/g, '-');
}

function toCaptionFromUrl(url) {
  const base = decodeURIComponent(url.split('/').pop() || '').replace(/\.[a-zA-Z0-9]+$/, '');
  return base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Follow redirect
          https.get(res.headers.location, (res2) => res2.pipe(file));
        } else if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        } else {
          res.pipe(file);
        }
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => {
        file.close();
        fs.unlink(destPath, () => {});
        reject(err);
      });
  });
}

async function main() {
  const categories = parseByCategory(RAW_INPUT);
  ensureDir(OUTPUT_DIR);

  const manifest = {
    generatedAt: new Date().toISOString(),
    basePath: '/images/cars/exter/',
    categories: {},
  };

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
        items.push({
          title: toCaptionFromUrl(url),
          file: fileName,
          src: `/images/cars/exter/${fileName}`,
          origin: url,
        });
      } catch (e) {
        // Skip failed downloads but log
        console.warn(`[skip] ${url} → ${fileName}: ${e.message}`);
      }
    }
    manifest.categories[key] = items;
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Saved ${MANIFEST_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


