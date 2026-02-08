import { defineCollection, z } from "astro:content";

// 1. Define the schema (the rules) for your blog posts
const blogCollection = defineCollection({
  type: "content", // v2.5.0+ requires this
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    description: z.string().optional(),
    branch: z
      .enum([
        "main",
        "dev",
        "dotfiles",
        "tty",
        "staging",
        "fetch",
        "rfc",
        "hotfix",
      ])
      .default("main"),
  }),
});

// 2. Export it to register the collection
export const collections = {
  blog: blogCollection, // The key 'blog' must match your folder name in src/content/
};
