import type { MetadataRoute } from "next";
import { CLINIC } from "@/lib/clinic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${CLINIC.siteUrl}/sitemap.xml`,
    host: CLINIC.siteUrl,
  };
}
