// Post-build: delete PNG and JPG files in dist/_astro that nothing in dist
// references. Astro copies every source image there even though pages only
// use the optimized WebP (and the JPG share images, which are referenced
// and so kept). Saves deploy size; no visitor ever requested these.
import { readdirSync, readFileSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const textExt = /\.(html|css|js|mjs|json|xml|txt|webmanifest|svg)$/;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const files = walk(dist);
const corpus = files.filter((f) => textExt.test(f)).map((f) => readFileSync(f, "utf8")).join("\n");

let removed = 0;
let bytes = 0;
for (const file of files) {
  if (!file.startsWith(join(dist, "_astro")) || !/\.(png|jpe?g)$/i.test(file)) continue;
  const name = file.slice(file.lastIndexOf("/") + 1);
  if (corpus.includes(name)) continue;
  bytes += statSync(file).size;
  unlinkSync(file);
  removed++;
}
console.log(`prune-originals: removed ${removed} unreferenced images (${(bytes / 1e6).toFixed(1)} MB)`);
