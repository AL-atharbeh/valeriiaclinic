"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { CONTENT, type Lang } from "@/lib/content";

export default function LangToggle({
  lang,
  tone = "light",
}: {
  lang: Lang;
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  const other: Lang = lang === "ar" ? "en" : "ar";
  const href = pathname.replace(/^\/(ar|en)/, `/${other}`) || `/${other}`;

  const shell =
    tone === "light"
      ? "text-ink ring-ink/15 hover:bg-linen"
      : "text-linen ring-linen/25 hover:bg-linen/10";

  return (
    <Link
      href={href}
      hrefLang={other}
      aria-label={CONTENT[lang].nav.toggleLabel}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition-colors duration-200 max-sm:min-h-11 ${shell}`}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span>{CONTENT[lang].nav.otherLangName}</span>
    </Link>
  );
}
