"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Star, MessageSquare, Award, BadgeCheck, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { CLINIC } from "@/lib/clinic";
import { CONTENT, type Lang } from "@/lib/content";
import { digits } from "@/lib/format";

/**
 * شريط الثقة — الرقمان ٤.٩ و١٧ وحدهما يعدّان تصاعدياً، مرة واحدة.
 * بقية الأرقام ثابتة: العدّاد على كل رقم يصبح ضجيجاً.
 */
export default function TrustBar({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].trust;

  return (
    <section className="border-y border-ink/8 bg-linen">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            <Item icon={<Star className="h-4 w-4 fill-current" />} label={c.ratingLabel}>
              <Counter to={CLINIC.rating} decimals={1} lang={lang} />
            </Item>

            <Item icon={<MessageSquare className="h-4 w-4" />} label={c.reviewsLabel}>
              <span className="tnum">{digits(CLINIC.reviews, lang)}</span>
            </Item>

            <Item icon={<Award className="h-4 w-4" />} label={c.experienceLabel}>
              <Counter to={CLINIC.experienceYears} lang={lang} />
            </Item>

            <Item icon={<BadgeCheck className="h-4 w-4" />} label={c.licenceLabel}>
              <span className="tnum">{digits(CLINIC.licence, lang)}</span>
            </Item>

            <Item
              icon={<MapPin className="h-4 w-4" />}
              label={c.addressLabel}
              wide
            >
              <span className="text-base font-semibold leading-snug sm:text-lg">
                {c.addressValue}
              </span>
            </Item>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Item({
  icon,
  label,
  children,
  wide = false,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""}>
      <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <span className="text-sage-ink" aria-hidden="true">
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-2 font-heading text-2xl font-normal text-ink sm:text-3xl">
        {children}
      </dd>
    </div>
  );
}

/** عدّاد تصاعدي واحد، ١.٢ث، يبدأ عند دخول العنصر ولا يتكرر. */
function Counter({
  to,
  lang,
  decimals = 0,
}: {
  to: number;
  lang: Lang;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce || !inView) return;

    let raf = 0;
    const start = performance.now();
    const DURATION = 1200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // نفس منحنى بقية الموقع — تسارع سريع ثم استقرار
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tnum">
      {digits(value.toFixed(decimals), lang)}
    </span>
  );
}
