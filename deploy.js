#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Ethiopian Budget App - Vercel Deployment Helper\n');

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI not found. Installing...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

// Check if vercel.json exists
if (!fs.existsSync('vercel.json')) {
  console.log('❌ vercel.json not found');
  process.exit(1);
}
console.log('✅ Vercel configuration found');

// Check if API directory exists
if (!fs.existsSync('api')) {
  console.log('❌ API directory not found');
  process.exit(1);
}
console.log('✅ API functions found');

// Run build test
console.log('\n🔨 Testing build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');
} catch (error) {
  console.log('❌ Build failed');
  process.exit(1);
}

// Deploy to Vercel
console.log('\n🌐 Deploying to Vercel...');
try {
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('\n🎉 Deployment successful!');
  console.log('\n📋 Next steps:');
  console.log('1. Test your API endpoints');
  console.log('2. Verify frontend functionality');
  console.log('3. Set up custom domain (optional)');
  console.log('4. Configure environment variables (if needed)');
} catch (error) {
  console.log('❌ Deployment failed');
  console.log('💡 Try running: vercel login');
  process.exit(1);
} 