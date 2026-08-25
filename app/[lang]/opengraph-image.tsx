import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { CONTENT, isLang, LANGS, type Lang } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Dr. Valeriia Clinic — Jabriya, Kuwait";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "ar";
  const c = CONTENT[lang].meta;

  const logo = await readFile(
    path.join(process.cwd(), "public", "assets", "logo.jpg"),
  );
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  /* satori لا يشكّل العربية بلا خط عربي مرفق، ولا يقرأ جداول GSUB المعقّدة
     في Noto Kufi. خط النصوص العربية نفسه يمرّ، وهو مضمّن في المستودع
     برخصة OFL فلا اعتماد على الشبكة وقت البناء. */
  const arabic = await readFile(
    path.join(process.cwd(), "assets", "fonts", "IBMPlexSansArabic-Regular.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          /* نفس طبقة ضوء العلو التي تفتح بها الصفحة */
          backgroundColor: "#FBFAF8",
          backgroundImage:
            "radial-gradient(120% 80% at 50% -10%, rgba(255,247,237,0.95) 0%, rgba(246,240,235,0.55) 35%, rgba(251,250,248,0) 70%)",
          fontFamily: "IBM Plex Sans Arabic, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={132}
          height={132}
          style={{ borderRadius: 16 }}
        />
        <div
          style={{
            marginTop: 44,
            fontSize: 58,
            color: "#1C1F26",
            letterSpacing: "-0.015em",
            textAlign: "center",
          }}
        >
          {c.ogTitle}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#5F6670",
            textAlign: "center",
          }}
        >
          {c.ogSubtitle}
        </div>
        <div
          style={{
            marginTop: 40,
            width: 68,
            height: 2,
            backgroundColor: "#7C8B7E",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Sans Arabic",
          data: arabic,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
