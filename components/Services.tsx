"use client";

import {
  Syringe,
  Droplets,
  Sparkles,
  Zap,
  ShieldCheck,
  Stethoscope,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { requestBooking } from "@/lib/book-event";
import { CONTENT, SERVICE_IDS, type Lang, type ServiceId } from "@/lib/content";

/** أيقونات خطية — بلا تعبئة ولا ظل. */
const ICONS: Record<ServiceId, React.ElementType> = {
  botox: Syringe,
  filler: Droplets,
  glow: Sparkles,
  laser: Zap,
  acne: ShieldCheck,
  consult: Stethoscope,
};

export default function Services({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].services;
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section id="services" className="scroll-mt-16 bg-porcelain py-12 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

        <div className="mt-9 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {SERVICE_IDS.map((id, i) => {
            const Icon = ICONS[id];
            const item = c.items[id];

            return (
              /* تتابع ٩٠ms بين البطاقات */
              <Reveal key={id} delay={i * 0.09}>
                <article className="group h-full rounded-card border border-ink/10 bg-porcelain p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-sage sm:p-7">
                  <Icon
                    className="h-6 w-6 text-sage-ink"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="t-h3 mt-5 font-heading font-normal text-ink">
                    {item.title}
                  </h3>
                  <p className="t-body mt-3 text-muted">{item.body}</p>

                  <button
                    type="button"
                    onClick={() => requestBooking(id)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-sage-ink transition-colors duration-200 hover:text-ink max-sm:min-h-11 sm:mt-6"
                  >
                    {c.bookThis}
                    <Arrow
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
