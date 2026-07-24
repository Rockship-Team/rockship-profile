import type { MetadataRoute } from "next";
import { caseStudiesData } from "@/lib/data";
import { DEMOS } from "@/lib/demos-content";
import { getAllSlugs } from "@/lib/supabase/queries";

const BASE_URL = "https://rockship.co";

/**
 * The site had no sitemap.xml at all — /sitemap.xml itself 404'd — which is
 * part of why Google still serves the previous site's /blogs and /talents URLs.
 * Listing the real routes here (paired with the redirects in next.config.js)
 * is what gets the stale ones dropped from the index.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/demos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const caseStudies: MetadataRoute.Sitemap = caseStudiesData.map((study) => ({
    url: `${BASE_URL}/case-studies/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const demos: MetadataRoute.Sitemap = DEMOS.map((demo) => ({
    url: `${BASE_URL}/demos/${demo.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Returns [] when Supabase isn't configured (e.g. a build without env vars),
  // so a missing database degrades the sitemap instead of failing the build.
  const postSlugs = await getAllSlugs();
  const posts: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseStudies, ...demos, ...posts];
}
