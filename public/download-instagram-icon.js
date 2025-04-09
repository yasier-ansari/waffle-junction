// This script will help you download the Instagram profile picture and convert it to PWA icons
// You'll need to run this script with Node.js

const https = require('https');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Instagram profile URL
const instagramUrl = 'https://www.instagram.com/waffle_junction17/';

// Function to download the profile picture
async function downloadProfilePicture() {
  console.log('Attempting to download profile picture from Instagram...');
  
  // Note: Instagram's API requires authentication, so this is a simplified approach
  // In a real scenario, you would need to use Instagram's Graph API with proper authentication
  
  // For demonstration purposes, we'll create a placeholder icon
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');
  
  // Fill background with amber color (matching your app theme)
  ctx.fillStyle = '#d97706';
  ctx.fillRect(0, 0, 512, 512);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('WJ', 256, 256);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'pwa-512x512.png'), buffer);
  
  // Create 192x192 version
  const smallCanvas = createCanvas(192, 192);
  const smallCtx = smallCanvas.getContext('2d');
  smallCtx.fillStyle = '#d97706';
  smallCtx.fillRect(0, 0, 192, 192);
  smallCtx.fillStyle = 'white';
  smallCtx.font = 'bold 30px Arial';
  smallCtx.textAlign = 'center';
  smallCtx.textBaseline = 'middle';
  smallCtx.fillText('WJ', 96, 96);
  
  const smallBuffer = smallCanvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'pwa-192x192.png'), smallBuffer);
  
  console.log('Created placeholder PWA icons in the public folder');
  console.log('To use the actual Instagram profile picture, you would need to:');
  console.log('1. Use Instagram\'s Graph API with proper authentication');
  console.log('2. Download the profile picture');
  console.log('3. Resize it to 192x192 and 512x512');
  console.log('4. Save as pwa-192x192.png and pwa-512x512.png in the public folder');
}

// Run the function
downloadProfilePicture().catch(err => {
  console.error('Error:', err);
}); 