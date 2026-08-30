import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { CLINIC } from "@/lib/clinic";
import { CONTENT, type Lang } from "@/lib/content";
import { digits } from "@/lib/format";

export default function Footer({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].footer;
  const address = lang === "ar" ? CLINIC.addressAr : CLINIC.addressEn;
  const name = lang === "ar" ? CLINIC.nameAr : CLINIC.nameEn;

  return (
    <footer className="bg-deep text-linen">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/assets/logo.jpg"
              alt={c.logoAlt}
              width={112}
              height={112}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <p className="font-heading mt-4 text-lg text-porcelain">{name}</p>

            {/* ترخيص العيادة — الموضع الأول من موضعين */}
            <p className="mt-4 text-sm text-linen/75">
              {c.licenceLabel}{" "}
              <span className="tnum font-semibold text-porcelain">
                {digits(CLINIC.licence, lang)}
              </span>
            </p>
          </div>

          <div>
            <h2 className="t-eyebrow text-sage">{c.phoneLabel}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${CLINIC.phone}`}
                  dir="ltr"
                  className="tnum inline-flex items-center gap-2 text-linen/85 transition-colors hover:text-porcelain max-sm:min-h-11"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {digits(CLINIC.phoneDisplay, lang)}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CLINIC.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-linen/85 transition-colors hover:text-porcelain max-sm:min-h-11"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {c.whatsappLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="t-eyebrow text-sage">{c.instagramLabel}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={CLINIC.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-linen/85 transition-colors hover:text-porcelain max-sm:min-h-11"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {CLINIC.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={CLINIC.doctorInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-linen/85 transition-colors hover:text-porcelain max-sm:min-h-11"
                >
                  <InstagramIcon className="h-4 w-4" />
                  {CLINIC.doctorInstagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="t-eyebrow text-sage">{c.addressLabel}</h2>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-linen/85">
              <MapPin className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {address}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-linen/85">
              <span className="block text-xs font-semibold text-sage">
                {c.hoursLabel}
              </span>
              {c.hoursValue}
            </p>
          </div>
        </div>

        <div className="mt-9 border-t sm:mt-14 border-linen/15 pt-7">
          <p className="text-xs text-linen/70">
            © {digits(new Date().getFullYear(), lang)} {name} — {c.rights}
            {" · "}
            {/* ترخيص العيادة — الموضع الثاني */}
            {c.licenceLabel}{" "}
            <span className="tnum">{digits(CLINIC.licence, lang)}</span>
          </p>
          <p className="mt-2 text-xs text-linen/55">{c.preview}</p>
        </div>
      </div>
    </footer>
  );
}
