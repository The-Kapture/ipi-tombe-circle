import type { MetadataRoute } from "next";
import { makers } from "@/data/makers";
import { absoluteUrl } from "@/lib/seo";

const lastModified = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: makers.flatMap((maker) => maker.images.map(absoluteUrl)),
    },
    ...makers.map((maker) => ({
      url: absoluteUrl(`/makers/${maker.id}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: maker.images.map(absoluteUrl),
    })),
  ];
}
