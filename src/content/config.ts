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
      // Two distinct images per case, so each surface can be composed and
      // cropped independently:
      //   thumbnail — home + "more case studies" cards. Hard 4:3 crop
      //     (object-fit: cover). Export 1200×900.
      //   banner — case study page hero. Fixed 2:1 illustrative strip
      //     (enforced via aspect-ratio in CaseStudyLayout). Export 1920×960.
      // Both optional; each falls back to the other if only one is supplied.
      thumbnail: image().optional(),
      banner: image().optional(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  "case-studies": caseStudies,
};
