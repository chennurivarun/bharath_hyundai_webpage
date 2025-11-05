# Deployment Guide - Fixing Live Site Issues

## Problem: Changes visible on localhost but not on live deployment

This guide will help you fix the issue where your changes are visible locally but not on the live site.

## Quick Fix Steps

### Step 1: Clear Build Cache (Local)
Run this command to clear the Next.js build cache:
```bash
npm run clean
```
Or manually:
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
# Or on Mac/Linux
rm -rf .next
```

### Step 2: Rebuild Locally
```bash
npm run build
```

### Step 3: Commit and Push Changes
```bash
git add .
git commit -m "Update site with latest changes"
git push origin main
```

### Step 4: Force Rebuild on Vercel (if using Vercel)
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Deployments" tab
4. Click "Redeploy" on the latest deployment
5. Or trigger a new deployment by pushing to your main branch

### Step 5: Clear Browser Cache
- **Chrome/Edge**: Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
- Select "Cached images and files"
- Click "Clear data"
- Or use **Incognito/Private mode** to test without cache

### Step 6: Hard Refresh
- **Windows**: `Ctrl+F5` or `Ctrl+Shift+R`
- **Mac**: `Cmd+Shift+R`

## Common Issues & Solutions

### Issue 1: Vercel CDN Cache
**Solution**: Vercel caches static assets. After deploying:
1. Wait 1-2 minutes for CDN to update
2. Use a hard refresh (Ctrl+F5)
3. Or clear browser cache completely

### Issue 2: Build Cache Not Cleared
**Solution**: The `.next` folder contains cached builds. Always clear it before deploying:
```bash
npm run clean
```

### Issue 3: Changes Not Committed
**Solution**: Make sure all changes are committed and pushed:
```bash
git status  # Check what files changed
git add .
git commit -m "Your commit message"
git push
```

### Issue 4: Environment Differences
**Solution**: Check if your local and production environments match:
- Node.js version
- Next.js version
- Environment variables

## Verification Steps

1. **Check Build Output**: Run `npm run build` and check for errors
2. **Test Locally**: Run `npm run dev` and verify changes work
3. **Check Git Status**: Ensure all changes are committed
4. **Check Deployment Logs**: Review Vercel/build platform logs for errors
5. **Test in Incognito**: Use private browsing to bypass cache

## Next.js Configuration Updates

I've updated `next.config.mjs` to:
- Add proper cache headers for Next.js static files
- Ensure data routes are not cached (must-revalidate)
- Keep static assets cached for performance

## If Still Not Working

1. **Check Vercel Build Logs**: Look for build errors
2. **Verify File Changes**: Make sure files were actually saved
3. **Check Branch**: Ensure you're deploying from the correct branch
4. **Contact Support**: If using Vercel, check their status page

## Quick Commands Reference

```bash
# Clear cache and rebuild
npm run clean

# Build for production
npm run build

# Start production server (local testing)
npm run start

# Development server
npm run dev

# Check git status
git status

# Commit all changes
git add . && git commit -m "Update site"

# Push to repository
git push origin main
```

## Important Notes

- **Always clear `.next` folder** before deploying new changes
- **Commit and push** all changes before expecting them on live site
- **Wait 1-2 minutes** after deployment for CDN to update
- **Use hard refresh** (Ctrl+F5) to see changes immediately
- **Test in incognito mode** to bypass browser cache

