"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { getStatus, type Status } from "@/lib/hours";
import { CONTENT, type Lang } from "@/lib/content";
import { DAY_NAMES, digits, formatTime } from "@/lib/format";

/**
 * شارة الدوام الحية — تقرأ من lib/hours.ts بتوقيت الكويت،
 * لأن ساعات العيادة ساعات كويتية مهما كان توقيت جهاز الزائر.
 *
 * قبل التركيب تعرض معلومة ثابتة صحيحة («السبت–الخميس ٩–٩») لتفادي
 * عدم تطابق الترطيب ومنع قفزة التخطيط، ثم تتحول إلى الحالة الحية.
 */
export default function OpenNowBadge({
  lang,
  tone = "light",
}: {
  lang: Lang;
  tone?: "light" | "dark";
}) {
  const [status, setStatus] = useState<Status | null>(null);
  const reduce = useReducedMotion();
  const c = CONTENT[lang];

  useEffect(() => {
    const sync = () => setStatus(getStatus(new Date()));
    sync();
    const id = window.setInterval(sync, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const label = status ? labelFor(status, lang) : c.badge.fallback;
  const state = status?.state ?? "pending";

  const dot =
    state === "open"
      ? "bg-sage"
      : state === "closing-soon"
        ? "bg-warm"
        : state === "closed"
          ? "bg-muted/60"
          : "bg-linen";

  const shell =
    tone === "light"
      ? "bg-porcelain/70 text-ink ring-ink/12 backdrop-blur-sm"
      : "bg-linen/10 text-linen ring-linen/20";

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold ring-1 ${shell}`}
      role="status"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {state === "open" && !reduce && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-sage"
            animate={{ opacity: [0.7, 0, 0.7], scale: [1, 2.1, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dot}`} />
      </span>
      <span className="sr-only">{c.badge.srPrefix}</span>
      <span>{label}</span>
    </div>
  );
}

function labelFor(status: Status, lang: Lang): string {
  const b = CONTENT[lang].badge;

  if (status.state === "open") {
    return b.open(formatTime(status.closesAt ?? 0, lang));
  }
  if (status.state === "closing-soon") {
    return b.closingSoon(digits(status.minutesToClose ?? 0, lang));
  }

  const at = formatTime(status.nextOpenAt ?? 540, lang);
  const dayName = DAY_NAMES[lang][status.nextOpenDay ?? 6];

  // الجمعة — مغلق طوال اليوم
  if (status.closedAllDay) return b.closedToday(dayName, at);
  if (status.daysAhead === 0) return b.closedTodayLater(at);
  if (status.daysAhead === 1) return b.closedTomorrow(at);
  return b.closedNamedDay(dayName, at);
}
