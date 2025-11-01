# External URLs Found in the Codebase

## Summary
**IMPORTANT:** All image URLs in the car pages are **relative/local paths** (e.g., `/images/cars/...`). There are **NO external image URLs** currently being used for car images.

However, there are:
1. **Comments mentioning CDN** - but no actual external CDN URLs are used
2. **External links** (not images) - links to Hyundai official pages, PDFs, WhatsApp, etc.
3. **Validation functions** that expect HTTPS URLs, but they're currently failing because all paths are relative

---

## External Links (Not Images)

### Hyundai Official Website Links

#### EXTER Page (`app/exter/page.tsx`)
- `https://www.hyundai.com/in/en/find-a-car/exter/highlights` - Official Highlights
- `https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/exter-brochure.pdf` - EXTER Brochure (PDF)
- `https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/ExterKnightBrochure.pdf` - Knight Brochure (PDF)
- `https://www.hyundai.com/in/en/find-a-car/exter/exterior` - Official Exterior
- `https://www.hyundai.com/in/en/find-a-car/exter/interior` - Official Interior
- `https://www.hyundai.com/in/en/find-a-car/exter/performance` - Official Performance
- `https://www.hyundai.com/in/en/find-a-car/exter/safety` - Official Safety
- `https://www.hyundai.com/in/en/find-a-car/exter/convenience` - Official Convenience
- `https://www.hyundai.com/in/en/find-a-car/exter/specification` - Official Spec Table
- `https://www.hyundai.com/in/en/find-a-car/exter/features` - Features Matrix
- `https://www.hyundai.com/in/en/hyundai-story/hy-cng-duo` - Hy-CNG Duo Story

#### CRETA N LINE Page (`components/creta-nline-page.tsx`)
- `https://www.hyundai.com/in/en/find-a-car/creta-n-line/highlights` - Official highlights
- `https://www.hyundai.com/in/en/find-a-car/creta-n-line/exterior` - Exterior page

#### VENUE Page (`components/venue-page.tsx`)
- `https://www.hyundai.com/content/dam/hyundai/in/en/data/brochure/VenuedigitalBrochure.pdf` - Venue Digital Brochure (PDF)
- `https://clicktobuy.hyundai.co.in/` - Click to Buy
- `https://www.hyundai.com/in/en/find-a-car/venue/price` - Hyundai Prices
- `https://www.carwale.com/hyundai-cars/venue/` - CarWale Listing

---

## WhatsApp Links

### Used in Multiple Pages
- `https://wa.me/917733888999` - Main WhatsApp link
- `https://wa.me/917733888999?text=Hatchback ₹5–7L` - WhatsApp with pre-filled text
- `https://wa.me/917733888999?text=Automatic SUV ₹8–12L` - WhatsApp with pre-filled text
- `https://wa.me/917733888999?text=Sell my car` - WhatsApp with pre-filled text

**Files using WhatsApp links:**
- `app/used-cars/page.tsx` (multiple instances)
- `app/page.tsx`
- `components/whatsapp-button.tsx`

---

## YouTube API Scripts

### Used in Video Components
- `https://www.youtube.com/iframe_api` - YouTube iframe API

**Files using YouTube API:**
- `components/hero-video.tsx`
- `components/hero-video-cover.tsx`
- `components/hero-video-abs.tsx`

---

## Notes About Image URLs

### Current State
- **All image paths are relative**: `/images/cars/...`, `/images/i20/...`, etc.
- **No external CDN URLs** are currently being used for images

### Comments Mentioning CDN
1. **Creta N Line Page** (`components/creta-nline-page.tsx` line 7):
   ```
   // All images are pulled directly from Hyundai India public CDN (reference pages).
   ```
   **But:** All actual image paths are relative (`/images/cars/creta-nline/...`)

2. **Creta N Line Page** (`components/creta-nline-page.tsx` line 105):
   ```
   // Images for cards pulled from official Hyundai CDN (reference pages)
   ```
   **But:** All actual image paths are relative (`/images/cars/creta-nline/...`)

3. **Venue Page** (`components/venue-page.tsx` line 9):
   ```
   // 1) Replace image URLs below with your locally hosted copies (e.g., /assets/venue/..)
   ```
   **Status:** Images are already using local paths

### Validation Functions Expecting HTTPS
Several components have validation functions that check if image URLs are HTTPS, but these are currently failing because all paths are relative:

**Files with `isHttps` validation:**
- `components/alcazar-page.tsx` (line 19, 241)
- `components/creta-page.tsx` (line 19)
- `components/tucson-page.tsx` (line 19, 222)
- `components/aura-page.tsx` (line 19)
- `components/nios-page.tsx` (line 19)
- `components/i20-page.tsx` (line 19)

**Example from `alcazar-page.tsx`:**
```typescript
const isHttps = (url: string) => /^https:\/\//.test(url);
// ...
console.assert(isHttps(item.img), `Image URL must be https (index ${idx})`);
```

This assertion will fail for all relative paths like `/images/cars/...`.

---

## Why Images Might Not Be Loading

The images are not loading because:
1. **All image paths are relative** and expect files to be in the `public/images/` directory
2. **Many images are missing** - they're referenced but don't exist in the file system
3. **Images in `/images/cars/unknown/`** need to be moved to car-specific folders
4. **No external CDN fallback** - if local images don't exist, they won't load

---

## Recommended Action

If you want to use external CDN URLs, you would need to:
1. Find the original Hyundai CDN URLs for each image
2. Replace all relative paths with full HTTPS URLs
3. The validation functions already expect HTTPS URLs, so they would pass

However, it's better to:
1. Download all images to local `public/images/` directory
2. Keep using relative paths (current approach)
3. Remove or fix the `isHttps` validation functions since they're checking for HTTPS but all paths are relative

---

End of Document


