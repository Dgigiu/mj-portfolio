/**
 * One-shot TTF → WOFF2 conversion for the self-hosted variable fonts.
 * Reads every .ttf in src/assets/fonts/ and writes a .woff2 next to it.
 * Re-run with `node scripts/convert-fonts.mjs` if a font file changes.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import wawoff2 from "wawoff2";

const fontsDir = new URL("../src/assets/fonts/", import.meta.url).pathname;

const files = (await readdir(fontsDir)).filter((f) => f.endsWith(".ttf"));
if (files.length === 0) {
  console.log("No .ttf files found in", fontsDir);
  process.exit(0);
}

for (const file of files) {
  const ttf = await readFile(join(fontsDir, file));
  const woff2 = await wawoff2.compress(ttf);
  const out = file.replace(/\.ttf$/, ".woff2");
  await writeFile(join(fontsDir, out), woff2);
  console.log(
    `${file} (${(ttf.length / 1024).toFixed(0)} KB) → ${out} (${(woff2.length / 1024).toFixed(0)} KB)`
  );
}
