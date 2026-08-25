/**
 * منطق الدوام — المصدر الوحيد للحقيقة.
 * شارة «مفتوح الآن»، الجدول الأسبوعي، وفترات الحجز كلها تقرأ من هنا.
 *
 * الأيام بترقيم JavaScript: 0 الأحد … 6 السبت.
 * الأوقات بالدقائق من منتصف الليل بتوقيت الكويت.
 */

export type DayHours = { open: number; close: number } | null;

const H = (h: number, m = 0) => h * 60 + m;

/** السبت–الخميس ٩:٠٠ص–٩:٠٠م · الجمعة مغلق */
export const SCHEDULE: readonly DayHours[] = [
  { open: H(9), close: H(21) }, // 0 الأحد
  { open: H(9), close: H(21) }, // 1 الاثنين
  { open: H(9), close: H(21) }, // 2 الثلاثاء
  { open: H(9), close: H(21) }, // 3 الأربعاء
  { open: H(9), close: H(21) }, // 4 الخميس
  null, //                          5 الجمعة — مغلق
  { open: H(9), close: H(21) }, // 6 السبت
];

/** ترتيب عرض الأسبوع في الكويت يبدأ بالسبت */
export const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5] as const;

export const CLINIC_TZ = "Asia/Kuwait";

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** لحظة «الآن» كما تراها العيادة في الكويت، مهما كان توقيت جهاز الزائر. */
export function clinicNow(now: Date = new Date()): {
  day: number;
  minutes: number;
  year: number;
  month: number;
  date: number;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CLINIC_TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const hour = Number(get("hour")) % 24;

  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? now.getDay(),
    minutes: hour * 60 + Number(get("minute")),
    year: Number(get("year")),
    month: Number(get("month")),
    date: Number(get("day")),
  };
}

export type OpenState = "open" | "closing-soon" | "closed";

export type Status = {
  state: OpenState;
  /** اليوم الحالي بتوقيت الكويت */
  day: number;
  /** وقت الإغلاق اليوم — عند الحالتين open و closing-soon */
  closesAt?: number;
  /** الدقائق المتبقية حتى الإغلاق — عند closing-soon */
  minutesToClose?: number;
  /** يوم الفتح القادم — عند closed */
  nextOpenDay?: number;
  nextOpenAt?: number;
  /** ٠ = اليوم نفسه · ١ = غداً · أكبر = يوم مسمّى */
  daysAhead?: number;
  /** الجمعة: مغلق طوال اليوم */
  closedAllDay?: boolean;
};

export function getStatus(now: Date = new Date()): Status {
  const { day, minutes } = clinicNow(now);
  const today = SCHEDULE[day];

  if (today && minutes >= today.open && minutes < today.close) {
    const minutesToClose = today.close - minutes;
    return minutesToClose <= 60
      ? { state: "closing-soon", day, closesAt: today.close, minutesToClose }
      : { state: "open", day, closesAt: today.close };
  }

  // مغلق — ابحث عن أقرب فتح قادم
  if (today && minutes < today.open) {
    return {
      state: "closed",
      day,
      nextOpenDay: day,
      nextOpenAt: today.open,
      daysAhead: 0,
    };
  }

  for (let ahead = 1; ahead <= 7; ahead++) {
    const d = (day + ahead) % 7;
    const hours = SCHEDULE[d];
    if (hours) {
      return {
        state: "closed",
        day,
        nextOpenDay: d,
        nextOpenAt: hours.open,
        daysAhead: ahead,
        closedAllDay: today === null,
      };
    }
  }

  return { state: "closed", day, closedAllDay: today === null };
}

/** آخر فترة حجز = الإغلاق ناقص نصف ساعة → ٨:٣٠م */
export const SLOT_STEP = 30;

export function slotsForDay(day: number): number[] {
  const hours = SCHEDULE[day];
  if (!hours) return [];
  const out: number[] = [];
  for (let m = hours.open; m <= hours.close - SLOT_STEP; m += SLOT_STEP) {
    out.push(m);
  }
  return out;
}

export function isClosedDay(day: number): boolean {
  return SCHEDULE[day] === null;
}

/** أقرب N يوماً ابتداءً من اليوم بتوقيت الكويت (تشمل الجمعة معطّلة). */
export function upcomingDays(count = 14, now: Date = new Date()) {
  const { year, month, date } = clinicNow(now);
  // منتصف نهار UTC يمنع انزلاق التاريخ عبر المناطق الزمنية
  const start = new Date(Date.UTC(year, month - 1, date, 12));

  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const day = d.getUTCDay();
    return {
      /** مفتاح ثابت YYYY-MM-DD */
      iso: d.toISOString().slice(0, 10),
      day,
      dayOfMonth: d.getUTCDate(),
      month: d.getUTCMonth(),
      closed: isClosedDay(day),
      isToday: i === 0,
    };
  });
}
