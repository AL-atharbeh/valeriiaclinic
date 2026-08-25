"use client";

import { motion, useReducedMotion } from "motion/react";
import { CONTENT, type Lang } from "@/lib/content";

/**
 * مؤشر الارتفاع — خط رأسي رفيع بعلامات أفقية، يُرسم من الأعلى للأسفل.
 * مشتق من موقع العيادة الفعلي في الدور الثامن عشر، لا زخرفة عامة.
 */
const TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export default function Altitude({
  lang,
  delay = 1.3,
}: {
  lang: Lang;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const c = CONTENT[lang].hero;

  return (
    <div
      className="pointer-events-none relative flex h-56 w-14 shrink-0 flex-col items-center justify-end lg:h-72"
      role="img"
      aria-label={c.altitudeLabel}
    >
      {/* الخط الرأسي — يُرسم من الأعلى للأسفل خلال ٠.٩ث */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 h-[calc(100%-1.75rem)] w-px origin-top bg-sage/45"
        initial={reduce ? undefined : { scaleY: 0 }}
        animate={reduce ? undefined : { scaleY: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* العلامات الأفقية — تظهر تباعاً مع تقدّم الخط */}
      {TICKS.map((t, i) => (
        <motion.span
          key={t}
          aria-hidden="true"
          className={`absolute h-px bg-sage/55 ${i === TICKS.length - 1 ? "w-4" : "w-2"}`}
          style={{ top: `calc(${t} * (100% - 1.75rem))` }}
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.35, delay: delay + 0.15 + t * 0.75 }}
        />
      ))}

      <motion.span
        className="t-eyebrow absolute bottom-0 whitespace-nowrap text-sage-ink"
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.85 }}
      >
        {c.floorLabel}
      </motion.span>
    </div>
  );
}
