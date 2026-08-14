// Processes the raw client-provided photos in /photos into optimized files
// under public/photos/, same pattern as generate-brand-assets.mjs. Re-run
// with `npm run generate:photos` any time a source file in /photos changes.
import sharp from 'sharp';
import { mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const photosDir = join(root, 'photos');
const publicPhotosDir = join(root, 'public', 'photos');

mkdirSync(publicPhotosDir, { recursive: true });

function kb(path) {
  return (statSync(path).size / 1024).toFixed(1) + 'KB';
}

// Landscape (4:3) photos — resized to a width that stays sharp on a
// two-column desktop layout at up to ~700px displayed width, retina-included.
const landscape = [
  { name: 'container-port-dusk', ext: 'jpg' },
  { name: 'engineering-desk', ext: 'jpg' },
  { name: 'strategist-call', ext: 'jpg' },
];
for (const { name, ext } of landscape) {
  const outPath = join(publicPhotosDir, `${name}.jpg`);
  await sharp(join(photosDir, `${name}.${ext}`))
    .resize({ width: 1400 })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(outPath);
  console.log(`${name}.jpg written:`, kb(outPath));
}

// Founder portrait (3:4) — narrower max-width column (`max-w-sm`), so a
// smaller source width is plenty even at retina.
const portraitOut = join(publicPhotosDir, 'founder-headshot.jpg');
await sharp(join(photosDir, 'founder-headshot.png'))
  .resize({ width: 800 })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(portraitOut);
console.log('founder-headshot.jpg written:', kb(portraitOut));

console.log('Photos written to public/photos/.');
