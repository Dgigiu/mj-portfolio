import { defineCollection, z } from "astro:content";

const caseStudies = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      // Optional lead sentence for the work-index cards: shown as a serif
      // standfirst above the description. Authored as the summary's first
      // sentence so the card can strip it from the summary and avoid repeating
      // it. The full summary still feeds the case page lead and SEO description.
      benefit: z.string().optional(),
      role: z.string(),
      period: z.string(),
      client: z.string(),
      domain: z.string(),
      // One cover image per case, shared across every surface: the case
      // study page hero, the home + "more case studies" cards, and the
      // per-case OG/share image (derived from this at build time). Fixed
      // 1200:630 ratio (matches the OG standard) enforced via aspect-ratio
      // wherever it's displayed. Export 1920×1008.
      banner: image().optional(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  "case-studies": caseStudies,
};
