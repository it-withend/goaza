import type { MetadataRoute } from "next";
import { getSupabaseAnon } from "@/lib/supabase";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/unis`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const sb = getSupabaseAnon();
    const slugs: string[] = [];
    const page = 1000;
    let from = 0;
    for (;;) {
      const { data, error } = await sb.from("universities").select("slug").range(from, from + page - 1);
      if (error || !data?.length) break;
      for (const row of data as { slug: string }[]) {
        if (row.slug) slugs.push(row.slug);
      }
      if (data.length < page) break;
      from += page;
    }

    const uniRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
      url: `${SITE_URL}/unis/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...uniRoutes];
  } catch {
    return staticRoutes;
  }
}
