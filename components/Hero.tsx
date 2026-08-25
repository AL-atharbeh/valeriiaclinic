"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Altitude from "./Altitude";
import OpenNowBadge from "./OpenNowBadge";
import LangToggle from "./LangToggle";
import { CONTENT, type Lang } from "@/lib/content";

/**
 * الهيرو — ضوء العلو.
 *
 * العيادة في الدور ١٨ من برج، والضوء يدخلها من نافذة عالية.
 * طبقة الإضاءة تنزل ببطء مع أول ٦٠٠ بكسل من التمرير: مركز الإشعاع
 * ينتقل من ‎-10%‎ إلى ‎20%‎ وتخفت الشدة قليلاً — كأن الشمس تتقدم في النهار.
 */

/* التسلسل — إزاحة ١٦ بكسل لا ٢٤، فالحركة هنا أهدأ */
const rise = (delay: number, reduce: boolean | null) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
      };

export default function Hero({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const c = CONTENT[lang].hero;

  const { scrollY } = useScroll();
  const centerY = useTransform(scrollY, [0, 600], ["-10%", "20%"]);
  const peak = useTransform(scrollY, [0, 600], [0.95, 0.62]);
  const mid = useTransform(scrollY, [0, 600], [0.55, 0.34]);

  const light = useMotionTemplate`radial-gradient(120% 80% at 50% ${centerY}, rgba(255,247,237,${peak}) 0%, rgba(246,240,235,${mid}) 35%, transparent 70%)`;

  return (
    <header className="relative isolate overflow-hidden bg-porcelain">
      {/* طبقة ضوء العلو */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduce ? undefined : { background: light }}
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1.6, ease: "easeOut" as const },
            })}
      />
      {/* نسخة ساكنة عند تعطيل الحركة — الضوء جزء من الهوية لا من الحركة */}
      {reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(120% 80% at 50% -10%, rgba(255,247,237,0.95) 0%, rgba(246,240,235,0.55) 35%, transparent 70%)",
          }}
        />
      )}

      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col px-5 pb-16 pt-6 sm:px-8 sm:pb-20">
        <motion.div
          className="flex items-center justify-between gap-4"
          {...rise(0.4, reduce)}
        >
          <Image
            src="/assets/logo.jpg"
            alt={c.logoAlt}
            width={112}
            height={112}
            priority
            className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16"
          />
          <LangToggle lang={lang} />
        </motion.div>

        <div className="flex flex-1 items-center">
          <div className="flex w-full items-stretch gap-6 sm:gap-10">
            <div className="max-w-2xl flex-1 py-12">
              <motion.p
                className="t-eyebrow text-sage-ink"
                {...rise(0.55, reduce)}
              >
                {c.eyebrow}
              </motion.p>

              <motion.h1
                className="t-display mt-5 font-heading font-normal text-ink"
                {...rise(0.55, reduce)}
              >
                {c.title}
              </motion.h1>

              <motion.p
                className="t-lead mt-6 max-w-xl text-muted"
                {...rise(0.8, reduce)}
              >
                {c.subtitle}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-3"
                {...rise(0.95, reduce)}
              >
                <Link
                  href="#booking"
                  className="inline-flex items-center justify-center rounded-full bg-warm px-8 py-4 text-base font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {c.primaryCta}
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-ink ring-1 ring-ink/15 transition-colors duration-200 hover:bg-linen"
                >
                  {c.secondaryCta}
                </Link>
              </motion.div>

              <motion.div className="mt-7" {...rise(1.1, reduce)}>
                <OpenNowBadge lang={lang} />
              </motion.div>
            </div>

            {/* مؤشر الارتفاع — يحاذي النص، ويختفي على الشاشات الضيقة جداً */}
            <div className="hidden items-center sm:flex">
              <Altitude lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
