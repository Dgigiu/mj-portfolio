// One-shot generator for the default social share image (og:image).
// Run: node scripts/build-og-image.mjs
// Writes public/og/default.png (1200×630). Per-case-study versions can
// follow the same pattern once cover images settle.
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";
import wawoff2 from "wawoff2";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

// The repo only keeps woff2; librsvg needs TTF, so decompress in memory.
const embed = async (file) => {
  const woff2 = readFileSync(resolve(root, "src/assets/fonts", file));
  return Buffer.from(await wawoff2.decompress(woff2)).toString("base64");
};
const geist = await embed("Geist-VariableFont_wght.woff2");
const aleo = await embed("Aleo-VariableFont_wght.woff2");

const BG = "#155fe8";
const FG = "#ffffff";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: 'Geist';
        src: url('data:font/ttf;base64,${geist}') format('truetype');
        font-weight: 100 900;
        font-style: normal;
      }
      @font-face {
        font-family: 'Aleo';
        src: url('data:font/ttf;base64,${aleo}') format('truetype');
        font-weight: 100 900;
        font-style: normal;
      }
    </style>
    <radialGradient id="vignette" cx="0%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#080e20" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#080e20" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#080e20" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#vignette)"/>
  <text x="96" y="330" font-family="Geist, system-ui, sans-serif" font-weight="700"
        font-size="92" letter-spacing="-0.02em" fill="${FG}">Miguel Jesus</text>
  <text x="98" y="404" font-family="Aleo, Georgia, serif" font-weight="400"
        font-size="40" fill="${FG}" fill-opacity="0.92">Senior Product Designer</text>
  <rect x="96" y="498" width="1008" height="2" fill="${FG}" fill-opacity="0.28"/>
  <text x="96" y="556" font-family="Geist, system-ui, sans-serif" font-weight="500"
        font-size="26" letter-spacing="0.02em" fill="${FG}" fill-opacity="0.92">Product case studies · SaaS and mobile</text>
</svg>
`;

mkdirSync(resolve(root, "public/og"), { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, "public/og/default.png"));

console.log("Wrote public/og/default.png (1200×630)");
