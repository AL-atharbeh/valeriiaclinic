import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/clinic";
import { LANGS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LANGS.map((lang) => ({
    url: `${CLINIC.siteUrl}/${lang}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: lang === "ar" ? 1 : 0.8,
    alternates: {
      languages: {
        ar: `${CLINIC.siteUrl}/ar`,
        en: `${CLINIC.siteUrl}/en`,
      },
    },
  }));
}
