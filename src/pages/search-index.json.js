import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog"); // Assuming your collection is 'blog'

  const searchIndex = posts.map((post) => ({
    title: post.data.title,
    slug: post.slug,
    // Simple regex to strip markdown syntax for better search text
    content: post.body
      .replace(/[#*\[\]()_`]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
