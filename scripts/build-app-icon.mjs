// One-shot generator for the apple-touch-icon and a matching favicon.
// Run: node scripts/build-app-icon.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const ttfPath = resolve(root, "src/assets/fonts/Geist-VariableFont_wght.ttf");
const ttf = readFileSync(ttfPath).toString("base64");

const BG = "#1a6bff";
const FG = "#ffffff";

const buildSvg = (size, fontSize, baselineY) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <style>
      @font-face {
        font-family: 'Geist';
        src: url('data:font/ttf;base64,${ttf}') format('truetype');
        font-weight: 100 900;
        font-style: normal;
      }
      text {
        font-family: 'Geist', system-ui, sans-serif;
        font-weight: 700;
        font-size: ${fontSize}px;
        letter-spacing: -0.04em;
        fill: ${FG};
        text-anchor: middle;
      }
    </style>
  </defs>
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text x="${size / 2}" y="${baselineY}">MJ</text>
</svg>
`;

const touchIconSvg = buildSvg(180, 96, 122);
await sharp(Buffer.from(touchIconSvg))
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, "public/apple-touch-icon.png"));

// Also write a 512 for general icon use (PWA manifests, etc.)
const largeSvg = buildSvg(512, 270, 346);
await sharp(Buffer.from(largeSvg))
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, "public/icon-512.png"));

// And refresh the SVG favicon to match the wordmark style (no font embed —
// the favicon stays vector and lets the OS pick a system sans).
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="${BG}"/>
  <text x="16" y="22" font-family="Geist, system-ui, sans-serif" font-size="17" font-weight="700" fill="${FG}" text-anchor="middle" letter-spacing="-0.04em">MJ</text>
</svg>
`;
writeFileSync(resolve(root, "public/favicon.svg"), faviconSvg);

console.log("Wrote public/apple-touch-icon.png (180), public/icon-512.png, public/favicon.svg");
