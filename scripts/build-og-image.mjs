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

// Centered composition (Figma "share assets" page, frame "OG - Default
// (crop-safe)"). iOS's share-sheet link preview crops this 1200×630 image
// down to a centered 630×630 square (x: 285–915) for its small icon; the
// old left-aligned layout landed mid-word inside that crop. Centering the
// mark and copy keeps them inside the crop window with margin to spare,
// while the full-width image (WhatsApp, Messages, Slack) still reads as an
// intentional centered poster rather than a truncated one.
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
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- MJ badge, echoes apple-touch-icon.png but inverted for the cobalt field -->
  <rect x="564" y="165" width="72" height="72" rx="16" fill="${FG}"/>
  <text x="600" y="211" text-anchor="middle" font-family="Geist, system-ui, sans-serif"
        font-weight="700" font-size="28" letter-spacing="-0.56" fill="${BG}">MJ</text>

  <text x="600" y="313" text-anchor="middle" font-family="Geist, system-ui, sans-serif"
        font-weight="700" font-size="60" letter-spacing="-1.2" fill="${FG}">Miguel Jesus</text>
  <text x="600" y="364" text-anchor="middle" font-family="Aleo, Georgia, serif"
        font-weight="400" font-size="30" fill="${FG}" fill-opacity="0.92">Senior Product Designer</text>

  <rect x="420" y="414" width="360" height="2" fill="${FG}" fill-opacity="0.28"/>
  <text x="600" y="452" text-anchor="middle" font-family="Geist, system-ui, sans-serif"
        font-weight="500" font-size="22" letter-spacing="0.44" fill="${FG}" fill-opacity="0.92">Product case studies · SaaS and mobile</text>
</svg>
`;

mkdirSync(resolve(root, "public/og"), { recursive: true });
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, "public/og/default.png"));

console.log("Wrote public/og/default.png (1200×630)");
