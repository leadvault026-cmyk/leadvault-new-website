// Generates public/og-image.png — a branded Open Graph image built from the real
// logo (the rectangular wordmark lockup at /logo/logo.png) composited onto a
// coded background, per CLAUDE.md's "generate a simple branded OG image as an
// SVG-rendered PNG." Re-run with `npm run generate:og` any time the brand mark,
// palette, or tagline changes.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, '..', 'logo', 'logo.png');
const outPath = join(__dirname, '..', 'public', 'og-image.png');

// Palette from CLAUDE.md design tokens v3 (client-specified exact brand colors).
const bgSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0B0D" />
      <stop offset="100%" stop-color="#000000" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B7FF00" stroke-opacity="0.1" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <circle cx="980" cy="200" r="240" fill="#00D9FF" fill-opacity="0.07" />
  <text x="70" y="290" font-family="Arial, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF">
    Every Business Needs Leads.
  </text>
  <text x="70" y="346" font-family="Arial, sans-serif" font-size="44" font-weight="800" fill="#B7FF00">
    Every Lead Starts Here.
  </text>
  <text x="72" y="410" font-family="Arial, sans-serif" font-size="23" font-weight="600" fill="#00D9FF">
    Fresh, verified leads — sourced on request,
  </text>
  <text x="72" y="442" font-family="Arial, sans-serif" font-size="23" font-weight="600" fill="#00D9FF">
    delivered in days.
  </text>
</svg>
`;

const logoWidth = 460;
const logoHeight = Math.round(logoWidth / 3); // source is exactly 3:1
const logoBuffer = await sharp(logoPath).resize({ width: logoWidth }).png().toBuffer();

await sharp(Buffer.from(bgSvg))
  .composite([{ input: logoBuffer, left: 1200 - logoWidth - 60, top: 90 }])
  .png()
  .toFile(outPath);

console.log(`OG image written to ${outPath}`);
