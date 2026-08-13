// Processes the raw brand assets in /logo into optimized files under public/,
// per the design-review requirement: "Copy the assets from /logo into public/.
// Create an optimized web version of logo.png (max ~40KB, correct height for
// the header, retina-sharp)." Re-run with `npm run generate:brand` any time
// the source files in /logo change.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { copyFileSync, writeFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const logoDir = join(root, 'logo');
const publicDir = join(root, 'public');

function kb(path) {
  return (statSync(path).size / 1024).toFixed(1) + 'KB';
}

// 1. Optimized header/footer logo — rendered from the vector source (not the
// 1254px raster) so it's crisp at any size and trivially small. Rendered at
// 320x320 (well beyond 2x retina for the ~48-64px display heights it's used
// at) and palette-compressed to stay inside the ~40KB budget.
const logoPngPath = join(publicDir, 'logo.png');
await sharp(join(logoDir, 'logo.svg'))
  .resize(512, 512)
  .png({ compressionLevel: 9, effort: 10, palette: true, colors: 192 })
  .toFile(logoPngPath);
console.log('logo.png written:', kb(logoPngPath));

// Vector copy too — used where the browser can take an SVG directly (crisper
// than any raster, and ~3KB).
copyFileSync(join(logoDir, 'logo.svg'), join(publicDir, 'logo.svg'));

// 2. Favicons — the 16/32/apple-touch PNGs are already correctly sized; copy
// as-is. favicon.svg copied for browsers that prefer a vector favicon.
copyFileSync(join(logoDir, 'favicon-16x16.png'), join(publicDir, 'favicon-16x16.png'));
copyFileSync(join(logoDir, 'favicon-32x32.png'), join(publicDir, 'favicon-32x32.png'));
copyFileSync(join(logoDir, 'apple-touch-icon.png'), join(publicDir, 'apple-touch-icon.png'));
copyFileSync(join(logoDir, 'favicon.svg'), join(publicDir, 'favicon.svg'));

// 3. favicon.ico — not provided in /logo, so it's generated here from the
// 16x16 and 32x32 PNGs (standard multi-resolution .ico).
const icoBuffer = await pngToIco([
  join(logoDir, 'favicon-16x16.png'),
  join(logoDir, 'favicon-32x32.png'),
]);
const icoPath = join(publicDir, 'favicon.ico');
writeFileSync(icoPath, icoBuffer);
console.log('favicon.ico written:', kb(icoPath));

console.log('Brand assets written to public/.');
