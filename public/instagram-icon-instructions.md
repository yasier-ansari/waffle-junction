# Instructions for Creating PWA Icons from Instagram Profile

## Option 1: Manual Download and Conversion

1. Visit the Waffle Junction Instagram profile: [https://www.instagram.com/waffle_junction17/](https://www.instagram.com/waffle_junction17/)
2. Right-click on the profile picture and select "Save Image As..."
3. Save the image to your computer
4. Use an online tool to resize the image:
   - [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
   - [Real Favicon Generator](https://realfavicongenerator.net/)
   - [App Manifest Generator](https://app-manifest.firebaseapp.com/)
5. Download the generated icons
6. Place the following files in your project's `public` folder:
   - `pwa-192x192.png` (192x192 pixels)
   - `pwa-512x512.png` (512x512 pixels)

## Option 2: Use Instagram's Graph API (Advanced)

If you need to automate this process, you can use Instagram's Graph API:

1. Create a Facebook Developer account
2. Create a new app
3. Set up Instagram Basic Display API
4. Generate an access token
5. Use the API to fetch the profile picture
6. Process the image to create the required icon sizes

## Option 3: Create a Custom Icon

If you prefer to create a custom icon that matches your app's branding:

1. Use a design tool like Figma, Adobe XD, or Canva
2. Create a square image with your brand colors (amber-600: #d97706)
3. Add your logo or initials
4. Export in the following sizes:
   - 192x192 pixels as `pwa-192x192.png`
   - 512x512 pixels as `pwa-512x512.png`
5. Place both files in your project's `public` folder

## Testing Your Icons

After adding the icons to your project:

1. Build your application: `npm run build`
2. Serve the built files: `npx serve dist`
3. Open Chrome DevTools > Application > Manifest
4. Verify that the icons are correctly referenced
5. Check the "Add to Home Screen" prompt on mobile devices 