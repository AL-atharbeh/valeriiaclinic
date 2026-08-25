import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/clinic";
import { LANGS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: lang === "ar" ? 1 : 0.8,
    alternates: {
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },
  }));
}
