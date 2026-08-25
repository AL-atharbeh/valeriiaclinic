import type { Lang } from "./content";

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** أرقام هندية للعربية، لاتينية للإنجليزية. دالة نقية — آمنة على الخادم والعميل. */
export function digits(value: string | number, lang: Lang): string {
  const s = String(value);
  return lang === "ar" ? s.replace(/\d/g, (d) => AR_DIGITS[Number(d)]) : s;
}

/** ٦٠٠ دقيقة → «١٠:٠٠ ص» أو «10:00 AM» */
export function formatTime(minutes: number, lang: Lang): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mm = String(m).padStart(2, "0");
  if (lang === "ar") {
    return `${digits(h12, "ar")}:${digits(mm, "ar")} ${h24 < 12 ? "ص" : "م"}`;
  }
  return `${h12}:${mm} ${h24 < 12 ? "AM" : "PM"}`;
}

export const DAY_NAMES: Record<Lang, string[]> = {
  ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

export const DAY_SHORT: Record<Lang, string[]> = {
  ar: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export const MONTH_NAMES: Record<Lang, string[]> = {
  ar: [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

/** «السبت ٣٠ أغسطس» */
export function formatDayDate(
  day: number,
  dayOfMonth: number,
  month: number,
  lang: Lang,
): string {
  const d = `${DAY_NAMES[lang][day]} ${digits(dayOfMonth, lang)} ${MONTH_NAMES[lang][month]}`;
  return d;
}

/**
 * تقسيم كلمة إلى حروف قابلة للتحريك **دون كسر الاتصال العربي**.
 *
 * وضع كل حرف في عنصر مستقل يفصل الكلمة ويجعلها تُرسم بأشكال منعزلة.
 * الحل: إضافة ZWJ (U+200D) على الجهة التي يُفترض أن يتصل بها الحرف،
 * فيختار المحرّك الشكل الابتدائي/الوسطي/النهائي الصحيح.
 */
const NON_CONNECTING = new Set(
  "اأإآءؤدذرزوةى".split(""),
);
const ZWJ = "‍";

function isArabicLetter(ch: string): boolean {
  return /[ء-ي]/.test(ch);
}

export type AnimatedGlyph = { key: string; text: string };

export function splitForStagger(word: string, lang: Lang): AnimatedGlyph[] {
  const chars = Array.from(word);

  if (lang !== "ar") {
    return chars.map((text, i) => ({ key: `${text}-${i}`, text }));
  }

  return chars.map((ch, i) => {
    const prev = chars[i - 1];
    const joinsBackward =
      i > 0 &&
      isArabicLetter(ch) &&
      isArabicLetter(prev) &&
      !NON_CONNECTING.has(prev);
    const joinsForward =
      i < chars.length - 1 &&
      isArabicLetter(ch) &&
      !NON_CONNECTING.has(ch) &&
      isArabicLetter(chars[i + 1]);

    return {
      key: `${ch}-${i}`,
      text: `${joinsBackward ? ZWJ : ""}${ch}${joinsForward ? ZWJ : ""}`,
    };
  });
}
