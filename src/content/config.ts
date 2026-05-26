import { defineCollection, z } from "astro:content";

const caseStudies = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
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
