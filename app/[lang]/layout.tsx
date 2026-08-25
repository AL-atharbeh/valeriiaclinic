import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Noto_Kufi_Arabic,
  IBM_Plex_Sans_Arabic,
  Cormorant_Garamond,
  Inter,
} from "next/font/google";
import { CLINIC, SITE_URL } from "@/lib/clinic";
import { CONTENT, LANGS, isLang, type Lang } from "@/lib/content";
import "../globals.css";

/* العربية أولاً: preload لها وحدها، واللاتينية عند الحاجة */
const headingAr = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-heading-ar",
  display: "swap",
  preload: true,
});

const bodyAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600"],
  variable: "--font-body-ar",
  display: "swap",
  preload: true,
});

const headingEn = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-heading-en",
  display: "swap",
  preload: false,
});

const bodyEn = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body-en",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  if (!isLang(raw)) return {};
  const lang = raw as Lang;
  const c = CONTENT[lang].meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: c.title,
    description: c.description,
    keywords:
      lang === "ar"
        ? [
            "عيادة جلدية الجابرية",
            "عيادة تجميل الكويت",
            "بوتوكس الكويت",
            "فيلر الكويت",
            "ليزر الجابرية",
            "نضارة البشرة الكويت",
            "طبيبة جلدية الجابرية",
            "برج مزايا الجابرية",
          ]
        : [
            "dermatology clinic Jabriya",
            "aesthetics clinic Kuwait",
            "botox Kuwait",
            "dermal fillers Kuwait",
            "laser Jabriya",
            "skin rejuvenation Kuwait",
            "female dermatologist Jabriya",
          ],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ar: "/ar",
        en: "/en",
        "x-default": "/ar",
      },
    },
    openGraph: {
      type: "website",
      siteName: lang === "ar" ? CLINIC.nameAr : CLINIC.nameEn,
      title: c.title,
      description: c.description,
      url: `/${lang}`,
      locale: lang === "ar" ? "ar_KW" : "en_KW",
      alternateLocale: lang === "ar" ? "en_KW" : "ar_KW",
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
    },
    robots: { index: true, follow: true },
  };
}

/** بيانات منظّمة — تقييم قوقل العام، ولا نجوم مزيّفة داخل الصفحة */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: CLINIC.nameAr,
  alternateName: CLINIC.nameEn,
  url: SITE_URL,
  medicalSpecialty: "Dermatology",
  telephone: CLINIC.phone,
  sameAs: [CLINIC.instagram, CLINIC.doctorInstagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "برج مزايا الجديد، الدور ١٨",
    addressLocality: "الجابرية",
    addressCountry: "KW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CLINIC.lat,
    longitude: CLINIC.lng,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(CLINIC.rating),
    reviewCount: String(CLINIC.reviews),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
  ],
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw as Lang;

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${headingAr.variable} ${bodyAr.variable} ${headingEn.variable} ${bodyEn.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:start-3 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-porcelain"
        >
          {CONTENT[lang].nav.skipToContent}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
