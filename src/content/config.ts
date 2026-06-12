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
      cover: image().optional(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  "case-studies": caseStudies,
};
