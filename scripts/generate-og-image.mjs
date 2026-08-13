// Generates public/og-image.png — a simple branded Open Graph image rendered from
// inline SVG (CLAUDE.md: "generate a simple branded OG image as an SVG-rendered PNG").
// Re-run with `node scripts/generate-og-image.mjs` any time the brand mark changes.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A1F44" />
      <stop offset="100%" stop-color="#081833" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1DBF9F" stroke-opacity="0.12" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <circle cx="1000" cy="120" r="220" fill="#1DBF9F" fill-opacity="0.08" />
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="88" font-weight="800">
    <tspan fill="#FFFFFF">Lead</tspan><tspan fill="#1DBF9F">Vault</tspan>
  </text>
  <text x="92" y="360" font-family="Arial, sans-serif" font-size="34" font-weight="600" fill="#F5F7FA">
    Every Business Needs Leads. Every Lead Starts Here.
  </text>
  <text x="92" y="410" font-family="Arial, sans-serif" font-size="24" fill="#1DBF9F">
    Fresh, verified leads — sourced on request, delivered in days.
  </text>
</svg>
`;

const outPath = join(__dirname, '..', 'public', 'og-image.png');
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`OG image written to ${outPath}`);
