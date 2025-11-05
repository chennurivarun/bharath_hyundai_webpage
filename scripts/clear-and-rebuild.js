#!/usr/bin/env node

/**
 * Script to clear Next.js cache and rebuild
 * Run: node scripts/clear-and-rebuild.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Clearing Next.js cache and build artifacts...\n');

const dirsToRemove = [
  '.next',
  'node_modules/.cache',
  '.turbo',
];

dirsToRemove.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${dir}...`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Removed ${dir}\n`);
    } catch (error) {
      console.error(`❌ Error removing ${dir}:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${dir} doesn't exist, skipping...\n`);
  }
});

console.log('🔨 Rebuilding Next.js application...\n');

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Commit your changes: git add . && git commit -m "Update site changes"');
  console.log('2. Push to your repository: git push');
  console.log('3. If using Vercel, it will auto-deploy. Otherwise, deploy manually.');
  console.log('4. Clear your browser cache (Ctrl+Shift+Delete) or use Incognito mode to test.');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

