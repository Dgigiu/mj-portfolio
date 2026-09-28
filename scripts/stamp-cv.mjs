// Stamps a `?ref=<tag>` onto the CV's clickable portfolio link, so visits
// from an application's CV show up tagged in Umami (see src/lib/analytics.ts).
// Only the link target changes; the visible text and layout are untouched.
//
//   node scripts/stamp-cv.mjs acme          -> docs/Applications/acme/<CV>.pdf
//   node scripts/stamp-cv.mjs cv --in-place -> rewrites public/miguel-jesus-cv.pdf
//
// Source is always public/miguel-jesus-cv.pdf, the current Pages export.
// Any existing ref on the link is replaced, so re-stamping is safe.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDict, PDFDocument, PDFHexString, PDFName, PDFString } from "pdf-lib";

const SOURCE = "public/miguel-jesus-cv.pdf";
const OUT_DIR = "docs/Applications";
// The name a recruiter sees, so no company tag in it.
const OUT_NAME = "Miguel Jesus - CV - Senior Product Designer.pdf";
const SITE_HOST = "migueljss.com";

const [tag, flag] = process.argv.slice(2);
const inPlace = flag === "--in-place";

// Same rule the site applies before tagging the session (tagReferral).
if (!tag || !/^[\w-]{1,40}$/.test(tag)) {
  console.error("Usage: node scripts/stamp-cv.mjs <tag> [--in-place]");
  console.error("Tag: letters, digits, - or _, up to 40 characters, e.g. acme");
  process.exit(1);
}
const ref = tag.toLowerCase();

const pdf = await PDFDocument.load(await readFile(SOURCE), { updateMetadata: false });

let stamped = 0;
for (const page of pdf.getPages()) {
  const annots = page.node.Annots();
  if (!annots) continue;
  for (let i = 0; i < annots.size(); i++) {
    const annot = annots.lookup(i, PDFDict);
    const action = annot.lookupMaybe(PDFName.of("A"), PDFDict);
    const uri = action?.lookupMaybe(PDFName.of("URI"), PDFString, PDFHexString);
    if (!uri) continue;

    const url = new URL(uri.decodeText());
    if (url.hostname.replace(/^www\./, "") !== SITE_HOST) continue;

    url.searchParams.set("ref", ref);
    action.set(PDFName.of("URI"), PDFString.of(url.toString()));
    stamped++;
  }
}

if (stamped === 0) {
  console.error(`No link to ${SITE_HOST} found in ${SOURCE}. Is the portfolio link still clickable in the Pages file?`);
  process.exit(1);
}

const out = inPlace ? SOURCE : path.join(OUT_DIR, ref, OUT_NAME);
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, await pdf.save({ useObjectStreams: false, updateFieldAppearances: false }));

console.log(`Stamped ${stamped} link(s) with ?ref=${ref}`);
console.log(`Portfolio link: https://${SITE_HOST}/?ref=${ref}`);
console.log(`Saved: ${out}`);
