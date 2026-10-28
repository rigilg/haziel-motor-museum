import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hazielmotormuseum.rigilgilbert.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/collection`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/timeline`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/tours`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/vehicles/ferrari-250-gto`, changeFrequency: "monthly", priority: 0.9 },
  ];
}
