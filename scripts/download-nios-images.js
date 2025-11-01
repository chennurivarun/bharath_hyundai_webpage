/*
  NIOS image downloader and manifest generator
*/
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'cars', 'nios');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const RAW_INPUT = `
Highlights
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_512x340_1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/high_1_512x340_2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/cngsmall-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/cngsmall-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/Grandi10niosnew/cngsmall-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Gallery%20Section/big/pc/niosgallery_3.jpg
Exterior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Exterior_Front_1120x600.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Exterior_1120x600_Diamond%20cut%20alloy%20wheels.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Exterior_1120x600_Side%20.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_7.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Exterior_1120x600_Rear.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Exterior_1120x600_Shark%20Fin%20Antenna.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_1120x600_8.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Extereior_512x340_Extereior_512x340_LED%20daytime%20running%20lamps%20(DRLs).jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Exterior/pc/Ext_512x340_4.jpg
Interior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/pc/niosafetypc1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Interior/pc/Dual%20tone%20grey%20interiors_1120x600.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Interior/mob/NIOS-Rear-AC-Vent.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Interior/pc/nios_intpc_06.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Interior/pc/nios_intpc_01.jpg
Performance
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/pc/big-image-new.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/pc/big-image.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/pc/small-image.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Highlights/pc/small-image-new.jpg
Safety
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Safety/pc/niosafetypc.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Safety/pc/Exterior_1120x600_Hill%20assist%20control.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Safety/pc/niosafetypc_1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Safety/pc/Exterior_1120x600_Electronic%20Stability%20control%20(ESC).jpg
Convenience
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/Exterior_1120x600_Speedometer%20with%20multi%20information%20display.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/Exterior_1120x600_Wireless%20phone%20charger.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/Convenience_512x340_USB%20Charger.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/niosconvpc_04.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/niosconvpc_05.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/niosconvpc_07.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/Grand-i10-Nios/Convenience/pc/rdwconv_1.jpg
`;

const CATEGORY_HEADERS = [
  { key: 'highlights', aliases: ['highlights'] },
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
  for (const c of CATEGORY_HEADERS) { if (c.aliases.some((a) => lc === a)) return c.key; }
  return null;
}
function parseByCategory(raw) {
  const lines = raw.split(/\r?\n/);
  let current = 'highlights';
  const buckets = { highlights: [], exterior: [], interior: [], performance: [], safety: [], convenience: [] };
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
function sanitizeFileName(name) { return decodeURIComponent(name).replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').toLowerCase(); }
function toFileNameFromUrl(url, i = 0) { const last = url.split('/').pop() || `image-${i}.jpg`; return sanitizeFileName(last); }
function toCaptionFromUrl(url) { const last = decodeURIComponent(url.split('/').pop() || '').replace(/\.[a-z0-9]+$/i,'').replace(/[-_]+/g,' ').trim(); return last; }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function absoluteRedirect(currentUrl, location) { try { const loc=location.trim(); if(/^https?:\/\//i.test(loc)) return loc; const u=new URL(currentUrl); if(loc.startsWith('/')) return `${u.protocol}//${u.host}${loc}`; const base=currentUrl.substring(0,currentUrl.lastIndexOf('/')+1); return base+loc; } catch { return location; } }
function downloadFile(url, destPath) { return new Promise((resolve, reject) => { const file=fs.createWriteStream(destPath); https.get(encodeURI(url),(res)=>{ if(res.statusCode&&res.statusCode>=300&&res.statusCode<400&&res.headers.location){ const follow=absoluteRedirect(url,res.headers.location); https.get(follow,(res2)=>{ if(res2.statusCode!==200){ file.close(); fs.unlink(destPath,()=>{}); return reject(new Error(`HTTP ${res2.statusCode} for redirect ${follow}`)); } res2.pipe(file); file.on('finish',()=>file.close(resolve)); }).on('error',(e)=>{ file.close(); fs.unlink(destPath,()=>{}); reject(e); }); } else if(res.statusCode!==200){ file.close(); fs.unlink(destPath,()=>{}); return reject(new Error(`HTTP ${res.statusCode} for ${url}`)); } else { res.pipe(file); file.on('finish',()=>file.close(resolve)); } }).on('error',(err)=>{ file.close(); fs.unlink(destPath,()=>{}); reject(err); }); }); }

async function main(){
  const categories = parseByCategory(RAW_INPUT);
  ensureDir(OUTPUT_DIR);
  const manifest = { generatedAt: new Date().toISOString(), basePath: '/images/cars/nios/', categories: {} };
  for (const [key, list] of Object.entries(categories)) {
    const items = [];
    for (let i=0; i<list.length; i++) {
      const url = list[i];
      const fileName = toFileNameFromUrl(url, i);
      const localPath = path.join(OUTPUT_DIR, fileName);
      try { if (!fs.existsSync(localPath)) { await downloadFile(url, localPath); } items.push({ title: toCaptionFromUrl(url), file: fileName, src: `/images/cars/nios/${fileName}`, origin: url }); }
      catch(e){ console.warn(`[skip] ${url} → ${fileName}: ${e.message}`); }
    }
    manifest.categories[key] = items;
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`Saved ${MANIFEST_PATH}`);
}
main().catch((e)=>{ console.error(e); process.exit(1); });


