"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "./icons";
import { CLINIC } from "@/lib/clinic";
import { CONTENT, type Lang } from "@/lib/content";

/** يظهر بعد تمرير ٦٠٠ بكسل — على الجوال أساساً. */
export default function FloatingWhatsApp({ lang }: { lang: Lang }) {
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();
  const label = CONTENT[lang].floating.whatsapp;

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          href={`https://wa.me/${CLINIC.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="fixed bottom-5 end-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-deep text-porcelain shadow-lg shadow-ink/15 transition-transform duration-200 hover:-translate-y-0.5"
          initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
