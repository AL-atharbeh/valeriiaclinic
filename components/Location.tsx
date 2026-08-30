"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CLINIC, MAPS_EMBED_URL, MAPS_URL } from "@/lib/clinic";
import { CONTENT, type Lang } from "@/lib/content";
import { SCHEDULE, WEEK_ORDER, clinicNow } from "@/lib/hours";
import { DAY_NAMES, digits, formatTime } from "@/lib/format";

export default function Location({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].location;

  /* اليوم الحالي يُحسب على العميل بتوقيت الكويت — تاريخ البناء لا يصلح مرجعاً،
     وحسابه على الخادم يسبّب عدم تطابق الترطيب. */
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(clinicNow(new Date()).day), []);

  const address = lang === "ar" ? CLINIC.addressAr : CLINIC.addressEn;

  return (
    <section id="location" className="scroll-mt-16 bg-porcelain py-12 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} />

        {/* تنويه الدور — العيادة في الدور ١٨ ويصعب إيجادها بلا هذا السطر */}
        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-card border border-sage/35 bg-linen px-6 py-5">
            <Building2
              className="h-5 w-5 shrink-0 text-sage-ink"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="font-heading text-lg text-ink sm:text-xl">
              {c.floorNotice}
            </p>
            <p className="t-body w-full text-muted sm:w-auto sm:flex-1">
              {c.floorHint}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.12}>
            <h3 className="t-h3 font-heading font-normal text-ink">
              {c.hoursTitle}
            </h3>

            <table className="mt-5 w-full text-start">
              <caption className="sr-only">{c.hoursTitle}</caption>
              <tbody>
                {WEEK_ORDER.map((day) => {
                  const hours = SCHEDULE[day];
                  const isToday = today === day;

                  return (
                    <tr
                      key={day}
                      className={`border-b border-ink/8 ${isToday ? "bg-linen" : ""}`}
                    >
                      <th
                        scope="row"
                        className="py-3 pe-4 ps-3 text-start text-sm font-semibold text-ink"
                      >
                        {DAY_NAMES[lang][day]}
                        {isToday && (
                          <span className="ms-2 rounded-full bg-sage/20 px-2 py-0.5 text-[0.68rem] font-semibold text-sage-ink">
                            {c.today}
                          </span>
                        )}
                      </th>
                      <td
                        dir="ltr"
                        className={`tnum py-3 pe-3 text-end text-sm ${
                          hours ? "text-muted" : "font-semibold text-sage-ink"
                        }`}
                      >
                        {hours
                          ? `${formatTime(hours.open, lang)} – ${formatTime(hours.close, lang)}`
                          : c.closed}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="mt-7">
              <p className="text-xs font-semibold text-muted">{c.addressLabel}</p>
              <p className="t-body mt-1 flex items-start gap-2 text-ink">
                <MapPin
                  className="mt-1.5 h-4 w-4 shrink-0 text-sage-ink"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {address}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-porcelain transition-transform duration-200 hover:-translate-y-0.5 max-sm:min-h-11 sm:w-auto sm:justify-start"
              >
                {c.mapsCta}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`tel:${CLINIC.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors duration-200 hover:bg-linen max-sm:min-h-11 sm:w-auto sm:justify-start"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {c.callCta}
                <span dir="ltr" className="tnum text-muted">
                  {digits(CLINIC.phoneDisplay, lang)}
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="h-64 overflow-hidden rounded-card ring-1 ring-ink/10 sm:h-80 lg:h-full lg:min-h-[26rem]">
              <iframe
                src={MAPS_EMBED_URL}
                title={c.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
