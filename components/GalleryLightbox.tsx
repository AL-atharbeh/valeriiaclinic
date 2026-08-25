"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import { CONTENT, type Lang } from "@/lib/content";
import { digits } from "@/lib/format";

export type GridEntry = {
  file: string;
  ratio: "tall" | "wide";
  beforeAfter: boolean;
  exists: boolean;
};

/**
 * Lightbox مبني يدوياً — بدون مكتبة.
 * يُغلق بـ Esc وبالنقر خارج الصورة، ويحبس التركيز داخله ويعيده عند الإغلاق.
 */
export default function GalleryGrid({
  entries,
  lang,
}: {
  entries: GridEntry[];
  lang: Lang;
}) {
  const c = CONTENT[lang].gallery;
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  /* الـ lightbox يتنقّل بين الصور الموجودة وحدها — المستطيلات الناقصة ليست صوراً. */
  const shown = useMemo(() => entries.filter((e) => e.exists), [entries]);

  const isOpen = index !== null;
  const rtl = lang === "ar";

  const close = useCallback(() => {
    setIndex(null);
    openerRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) =>
      setIndex((current) =>
        current === null ? current : (current + delta + shown.length) % shown.length,
      ),
    [shown.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        step(rtl ? -1 : 1);
        return;
      }
      if (event.key === "ArrowLeft") {
        step(rtl ? 1 : -1);
        return;
      }
      if (event.key !== "Tab") return;

      // فخ التركيز
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, close, step, rtl]);

  return (
    <>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, i) => {
          const label = c.imageAlt(digits(i + 1, lang));
          const span =
            entry.ratio === "wide" ? "sm:col-span-2 lg:col-span-2" : "";
          const aspect = entry.ratio === "wide" ? "aspect-[3/2]" : "aspect-[4/5]";
          const position = shown.indexOf(entry);

          return (
            <Reveal key={entry.file} delay={i * 0.09} className={span}>
              <li className="list-none">
                {entry.exists ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setIndex(position);
                    }}
                    aria-label={`${c.open} — ${label}`}
                    className={`group relative block w-full overflow-hidden rounded-card ring-1 ring-ink/10 ${aspect}`}
                  >
                    <Image
                      src={`/assets/${entry.file}`}
                      alt={label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:bg-ink/35 group-hover:opacity-100 group-focus-visible:bg-ink/35 group-focus-visible:opacity-100">
                      <Maximize2
                        className="h-6 w-6 text-porcelain"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ) : (
                  <div
                    role="img"
                    aria-label={label}
                    className={`flex items-center justify-center rounded-card bg-porcelain ring-1 ring-ink/10 ${aspect}`}
                  >
                    <span
                      dir="ltr"
                      className="px-3 text-center font-mono text-[0.68rem] leading-relaxed text-muted"
                    >
                      /assets/{entry.file}
                    </span>
                  </div>
                )}

                {/* تنويه إلزامي تحت كل صورة «قبل وبعد» */}
                {entry.beforeAfter && (
                  <p className="mt-2 text-xs text-muted">{c.resultsVary}</p>
                )}
              </li>
            </Reveal>
          );
        })}
      </ul>

      <AnimatePresence>
        {isOpen && shown[index] && (
          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={c.title}
              className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
            >
              <div
                className="relative w-full overflow-hidden rounded-card"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={`/assets/${shown[index].file}`}
                  alt={c.imageAlt(digits(index + 1, lang))}
                  width={1600}
                  height={1100}
                  sizes="100vw"
                  className="h-auto max-h-[74svh] w-full object-contain"
                  priority
                />
              </div>

              {shown[index].beforeAfter && (
                <p className="text-xs text-linen/80">{c.resultsVary}</p>
              )}

              <div className="flex items-center gap-3 text-porcelain">
                <button
                  type="button"
                  onClick={() => step(rtl ? 1 : -1)}
                  aria-label={c.prev}
                  className="rounded-full bg-porcelain/12 p-2.5 ring-1 ring-porcelain/20 transition-colors hover:bg-porcelain/22"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="tnum text-sm text-linen/80">
                  {c.counter(digits(index + 1, lang), digits(shown.length, lang))}
                </span>
                <button
                  type="button"
                  onClick={() => step(rtl ? -1 : 1)}
                  aria-label={c.next}
                  className="rounded-full bg-porcelain/12 p-2.5 ring-1 ring-porcelain/20 transition-colors hover:bg-porcelain/22"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={c.close}
                className="absolute -top-1 end-0 rounded-full bg-porcelain/12 p-2.5 text-porcelain ring-1 ring-porcelain/20 transition-colors hover:bg-porcelain/22 sm:-top-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
