# Comprehensive Image Download & Organization

## Current Status

### Scripts Created
1. ✅ `scripts/download-and-update-images.js` - Basic downloader (working)
2. ✅ `scripts/download-images-comprehensive.js` - Enhanced downloader with:
   - Context-aware filename generation
   - Description-based organization
   - Duplicate detection
   - Better error handling

### Issues Found
- Many Hyundai CDN URLs return 404 (images may have been moved/removed)
- Some URLs redirect to relative paths (now handled)
- Need to verify which images actually exist vs which are referenced

### Next Steps

1. **Verify Available Images**
   - Test URLs before downloading
   - Handle 404s gracefully
   - Log unavailable images for manual review

2. **Organize by Model & Section**
   - Model folders: `i20`, `i20-nline`, `creta`, `creta-nline`, `venue`, `verna`, etc.
   - Section subfolders: `highlights`, `exterior`, `interior`, `performance`, `safety`, `convenience`
   - Example: `/images/cars/i20/highlights/i20-highlight-1.jpg`

3. **Match Descriptions**
   - Extract image descriptions from code (title, alt, caption)
   - Use descriptions in filenames
   - Ensure images match their descriptions

4. **Update References**
   - Update all external URLs to local paths
   - Ensure consistent naming
   - No duplicates

## Usage

```bash
# Download all images comprehensively
npm run download-images-all

# Download only new external URLs
npm run download-images
```

## Current Image Organization

```
public/images/
├── cars/
│   ├── i20/
│   ├── i20-nline/
│   ├── creta/
│   ├── creta-nline/
│   ├── creta-ev/
│   ├── venue/
│   ├── venue-nline/
│   ├── verna/ (✓ 7 images downloaded)
│   ├── exter/
│   ├── tucson/
│   ├── alcazar/
│   ├── aura/
│   ├── nios/
│   └── ioniq5/
```

## Notes

- Some URLs may be outdated (404 errors)
- Images are organized by model and section
- Descriptions are used to generate meaningful filenames
- Duplicates are detected and avoided

