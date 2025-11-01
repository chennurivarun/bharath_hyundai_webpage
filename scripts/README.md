# Image Download and Update Script

## Overview
This script automatically finds, downloads, and updates external image URLs across your codebase.

## Features
- ✅ Scans all TSX/TS files for external image URLs
- ✅ Organizes images by page/component hierarchy  
- ✅ Downloads with rate limiting (500ms delay, max 3 concurrent)
- ✅ Updates all references automatically
- ✅ Skips already downloaded files
- ✅ Handles redirects and validates content types

## Usage

```bash
npm run download-images
```

## What It Does

1. **Scans** `components/` and `app/` directories for external image URLs
2. **Organizes** images by model (verna, creta, venue, etc.) into `public/images/cars/{model}/`
3. **Downloads** images with rate limiting to avoid overwhelming servers
4. **Updates** all file references from external URLs to local paths

## Configuration

Edit `scripts/download-and-update-images.js` to adjust:
- `downloadDelay`: Delay between downloads (ms)
- `maxConcurrent`: Max concurrent downloads
- `timeout`: Request timeout (ms)

## Filtering

The script filters out:
- HTML page URLs (e.g., `/find-a-car/...`)
- Non-image file types (PDF, HTML, etc.)
- URLs that are clearly not images

## Output

- Images saved to: `public/images/cars/{model}/`
- Updated files are shown in console
- Download summary shows completed/failed counts

## Notes

- Already downloaded files are skipped
- Failed downloads are logged but don't stop the process
- The script preserves quote styles and formatting when updating references

