import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Added fields from your previous blog
    author: z.object({
      name: z.string(),
      avatar: z.string().optional(),
    }),
    featured: z.boolean().default(false),
  })
});

const research = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Research specific fields
    authors: z.array(z.string()),
    journal: z.string().optional(),
    doi: z.string().optional(),
    status: z.enum(['published', 'preprint', 'in-progress']).default('in-progress'),
    featured: z.boolean().default(false),
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })).optional(),
  })
});

export const collections = {
  'blog': blog,
  'research': research,
};
