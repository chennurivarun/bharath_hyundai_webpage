/*
  CRETA N Line image downloader and manifest generator
  - Parses the provided URL blob (with concatenations)
  - Downloads into public/images/cars/creta-nline/
  - Writes manifest.json with categories and captions derived from filenames
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'cars', 'creta-nline');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const RAW_INPUT = `
create nline
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinebig2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinefrontgrilsplitter.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinebatch.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinebatch.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinedashcam.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinedatc.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinemood.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinemood.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinetailight.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinediffuser.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinehorizonlamp.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinescoopseats.jpg
Exterior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinebig3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/side.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-rightsideview.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-frontsideview.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-rightsideview-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-tyre.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinediffuserdesign.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Exterior/tab/creta-n-line-exterior-small-1.jpg
Interior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/CRETA%20N%20Line%20-%20interior%20-top%20big%20image.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/creta-n-line-interior-seatdesign.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/creta-n-line-interior-seatdesign1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/creta-n-line-interior-seatdesign1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior-airbag.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior-seatcompactdesign.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-compact-bootspace.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior-flexibleseat.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior-mirror.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior-babyseat.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/tab/creta-n-line-interior-acvent.jpg
Performance
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/pc/creta-n-line%20suv%20performance-dieselengine-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-automatictransmission.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-manualtransmission.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Performance/creta-n-line-suv-performance-topview.jpg
Safety
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Big-image-1st.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Big-image-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-ABS.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-display.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/ESC.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlineheadlamp.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-headlamp.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinefrontparkingsensors.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinefwdcollcar.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinefwdcollman.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-6.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/fwcolljunctwarning.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-11.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-11.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-10.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-12.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-14.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinelfa.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinescc.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/ctanlinesafeexist.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/safety/pc/creta-n-line-suv-safety-display-1.jpg
Convenience
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-display.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-bosemusicsystem.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/pc/creta-n-line-suv-convenience-topview.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/highlights/knight/cretanlinedatc.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/mob/creta-n-line-suv-convenience-dashboard.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/mob/creta-n-line-suv-convenience-wirelesscharger.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/Interior/pc/Convenience%20-%204%20-%20sunroof.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/creta-n-line/convenience/mob/creta-n-line-suv-convenience-poweroutlet.jpg
`;

const CATEGORY_HEADERS = [
  { key: 'highlights', aliases: ['create nline', 'highlights', 'knight'] },
  { key: 'exterior', aliases: ['exterior'] },
  { key: 'interior', aliases: ['interior'] },
  { key: 'performance', aliases: ['performance'] },
  { key: 'safety', aliases: ['safety'] },
  { key: 'convenience', aliases: ['convenience'] },
];

function splitConcatenatedUrls(text) {
  const normalized = text
    .replace(/https:\/\//g, '\nhttps://')
    .split(/\s+/)
    .filter(Boolean);
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
    // relative path
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
          if (res2.statusCode !== 200) {
            file.close(); fs.unlink(destPath, () => {});
            return reject(new Error(`HTTP ${res2.statusCode} for redirect ${follow}`));
          }
          res2.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', (e) => { file.close(); fs.unlink(destPath, () => {}); reject(e); });
      } else if (res.statusCode !== 200) {
        file.close(); fs.unlink(destPath, () => {});
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      } else {
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      }
    }).on('error', (err) => { file.close(); fs.unlink(destPath, () => {}); reject(err); });
  });
}

async function main() {
  const categories = parseByCategory(RAW_INPUT);
  ensureDir(OUTPUT_DIR);
  const manifest = { generatedAt: new Date().toISOString(), basePath: '/images/cars/creta-nline/', categories: {} };
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
        items.push({ title: toCaptionFromUrl(url), file: fileName, src: `/images/cars/creta-nline/${fileName}`, origin: url });
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


