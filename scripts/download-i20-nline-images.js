/* i20 N Line image downloader and manifest generator */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'cars', 'i20-nline');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const RAW_INPUT = `
highlets
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlineradiogrille.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinezshapeline.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-nline-Highlight-big-section-pc3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinefrontgrille.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-nline-Highlight-big-section-pc3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-nline-Highlight-small-section-pc3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20-nline-Highlight-small-section-pc4.jpg
Exterior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Exterior/Hyundai-i20-nline-Exterior-small-section-PC-800x530-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinefrontgrille.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Exterior/Hyundai-i20-nline-Exterior-small-section-PC-800x530-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Exterior/Hyundai-i20-nline-Exterior-small-section-PC-800x530-4.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Exterior/Hyundai-i20-nline-Exterior-small-section-PC-800x530-5.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Exterior/Hyundai-i20-nline-Exterior-small-section-PC-800x530-6.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinezshapeline.jpg
Interior
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/i20-nline-Interior-big1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/i20-nline-Interior-big2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Hyundai-i20-nline-Interior-small-section-PC-800x530-1-r.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/Hyundai-i20Nline-Interior-Bottom-PC-512x340-2.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/Hyundai-i20-nline-Interior-small-section-PC-800x530-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/Hyundai-i20Nline-Interior-Bottom-PC-512x340-5.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/Hyundai-i20Nline-Interior-Bottom-PC-512x340-5.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/pc/Hyundai-i20Nline-Interior-Bottom-PC-512x340-6.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Interior/Hyundai-i20-nline-Interior-small-section-PC-800x530-6.jpg
Performance
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/pc/i20-nlinebig-pc.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/pc/i20-nlineperfsmall-pc1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/pc/i20-nlineperfsmall-pc2.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/pc/i20-nlineperfsmall-pc3.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/pc/i20-nlineperfsmall-pc5.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/pc/i20-nlineperfsmall-pc6.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/Hyundai-i20-nline-performance-small-section-PC-800x530-4%20(2).jpg
Safety
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Safety/pc/Hyundai-i20-nline-safety-big-section-PC-1120x600-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlineshutterestock.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Safety/Hyundai-i20-nline-safety-big-section-PC-1120x600-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Safety/Hyundai-i20-nline-safety-big-section-PC-1120x600-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/Hyundai-i20-nline-safety-small-section-PC-512x340-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/Hyundai-i20-nline-safety-small-section-PC-512x340-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/Hyundai-i20-nline-safety-small-section-PC-512x340-3.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Performance/Hyundai-i20-nline-safety-small-section-PC-512x340-4.jpg
Convenience
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/i20-nline-convbig-pc-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/i20-nline-convbig-pc-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinealexa.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/Hyundai-i20Nline-Conveniance-middle-mob-tab-800x530-1.jpghttps://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/Hyundai-i20Nline-Conveniance-middle-mob-tab-800x530-1.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/i20-nline-convsmall-pc-2.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/Hyundai-i20Nline-Conveniance-middle-mob-tab-800x530-4.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Convenience/pc/Hyundai-i20Nline-Conveniance-middle-mob-tab-800x530-5.jpg
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/knight/i20nlinepuddlelamps.jpg
Specification
https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20-n-line/Highlights/pc/i20nlineinnerkv-pc.jpg
`;

const CATEGORY_HEADERS = [
  { key: 'highlights', aliases: ['highlets', 'highilets', 'highlights'] },
  { key: 'exterior', aliases: ['exterior'] },
  { key: 'interior', aliases: ['interior'] },
  { key: 'performance', aliases: ['performance'] },
  { key: 'safety', aliases: ['safety'] },
  { key: 'convenience', aliases: ['convenience'] },
  { key: 'specification', aliases: ['specification'] },
];

function splitConcatenatedUrls(text) {
  const normalized = text.replace(/https:\/\//g, '\nhttps://').split(/\s+/).filter(Boolean);
  const urlRegex = /^https:\/\/www\.hyundai\.com\/.*\.(?:jpg|jpeg|png|webp|avif)$/i;
  return normalized.filter((u) => urlRegex.test(u));
}
function detectCategory(line) { const lc=line.trim().toLowerCase(); for (const c of CATEGORY_HEADERS) { if (c.aliases.some(a=>lc===a)) return c.key; } return null; }
function parseByCategory(raw){ const lines=raw.split(/\r?\n/); let current='highlights'; const buckets={highlights:[],exterior:[],interior:[],performance:[],safety:[],convenience:[],specification:[]}; for (const line of lines){ const cat=detectCategory(line); if(cat){ current=cat; continue; } const urls=splitConcatenatedUrls(line); for(const u of urls) buckets[current].push(u);} for(const key of Object.keys(buckets)){ const seen=new Set(); buckets[key]=buckets[key].filter(u=> seen.has(u)? false : (seen.add(u), true)); } return buckets; }
function sanitizeFileName(name){ return decodeURIComponent(name).replace(/\s+/g,'-').replace(/[^a-zA-Z0-9._-]/g,'-').replace(/-+/g,'-').toLowerCase(); }
function toFileNameFromUrl(url,i=0){ const last=url.split('/').pop()||`image-${i}.jpg`; return sanitizeFileName(last); }
function toCaptionFromUrl(url){ const last=decodeURIComponent(url.split('/').pop()||'').replace(/\.[a-z0-9]+$/i,'').replace(/[-_]+/g,' ').trim(); return last; }
function ensureDir(dir){ fs.mkdirSync(dir,{recursive:true}); }
function absoluteRedirect(currentUrl, location){ try{ const loc=location.trim(); if(/^https?:\/\//i.test(loc)) return loc; const u=new URL(currentUrl); if(loc.startsWith('/')) return `${u.protocol}//${u.host}${loc}`; const base=currentUrl.substring(0,currentUrl.lastIndexOf('/')+1); return base+loc; } catch { return location; } }
function downloadFile(url,dest){ return new Promise((resolve,reject)=>{ const file=fs.createWriteStream(dest); https.get(encodeURI(url),(res)=>{ if(res.statusCode&&res.statusCode>=300&&res.statusCode<400&&res.headers.location){ const follow=absoluteRedirect(url,res.headers.location); https.get(follow,(res2)=>{ if(res2.statusCode!==200){ file.close(); fs.unlink(dest,()=>{}); return reject(new Error(`HTTP ${res2.statusCode} for redirect ${follow}`)); } res2.pipe(file); file.on('finish',()=>file.close(resolve)); }).on('error',(e)=>{ file.close(); fs.unlink(dest,()=>{}); reject(e); }); } else if(res.statusCode!==200){ file.close(); fs.unlink(dest,()=>{}); return reject(new Error(`HTTP ${res.statusCode} for ${url}`)); } else { res.pipe(file); file.on('finish',()=>file.close(resolve)); } }).on('error',(err)=>{ file.close(); fs.unlink(dest,()=>{}); reject(err); }); }); }

async function main(){
  const categories = parseByCategory(RAW_INPUT);
  ensureDir(OUTPUT_DIR);
  const manifest = { generatedAt: new Date().toISOString(), basePath: '/images/cars/i20-nline/', categories: {} };
  for (const [key,list] of Object.entries(categories)){
    const items=[];
    for(let i=0;i<list.length;i++){
      const url=list[i]; const fileName=toFileNameFromUrl(url,i); const local=path.join(OUTPUT_DIR,fileName);
      try{ if(!fs.existsSync(local)){ await downloadFile(url, local); } items.push({ title: toCaptionFromUrl(url), file:fileName, src:`/images/cars/i20-nline/${fileName}`, origin:url}); }
      catch(e){ console.warn(`[skip] ${url} → ${fileName}: ${e.message}`); }
    }
    manifest.categories[key]=items;
  }
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest,null,2),'utf-8');
  console.log(`Saved ${MANIFEST_PATH}`);
}
main().catch((e)=>{ console.error(e); process.exit(1); });


