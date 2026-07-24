import type { MetadataRoute } from "next";

/** /robots.txt 404'd before this; the sitemap reference is the point of it. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CMS behind the blog — nothing here belongs in a search index.
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: "https://rockship.co/sitemap.xml",
  };
}
