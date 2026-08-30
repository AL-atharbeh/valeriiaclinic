"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WhatsAppIcon } from "./icons";
import { CLINIC } from "@/lib/clinic";
import { BOOK_EVENT } from "@/lib/book-event";
import {
  CONTENT,
  SERVICE_IDS,
  type Lang,
  type ServiceId,
} from "@/lib/content";
import { slotsForDay, upcomingDays } from "@/lib/hours";
import { DAY_SHORT, digits, formatDayDate, formatTime } from "@/lib/format";

type DayOption = ReturnType<typeof upcomingDays>[number];
type FieldName = "service" | "name" | "day" | "time";

/**
 * لا خادم ولا قاعدة بيانات — النموذج يبني رسالة واتساب منظّمة ويفتحها.
 * الفترات تُقرأ من lib/hours.ts — ٩:٠٠ص حتى ٨:٣٠م، والجمعة معطّلة تلقائياً.
 */
export default function BookingForm({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].booking;
  const services = CONTENT[lang].services;

  const [days, setDays] = useState<DayOption[]>([]);
  const [service, setService] = useState<ServiceId | "">("");
  const [name, setName] = useState("");
  const [dayIso, setDayIso] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);

  // الأيام تُحسب على العميل — تاريخ البناء لا يصلح مرجعاً
  useEffect(() => {
    setDays(upcomingDays(14, new Date()));
  }, []);

  // بطاقة الخدمة تملأ الحقل مسبقاً ثم تنقل التركيز إلى النموذج
  useEffect(() => {
    const onRequest = (event: Event) => {
      const detail = (event as CustomEvent<ServiceId>).detail;
      setService(detail);
      setErrors((prev) => ({ ...prev, service: undefined }));
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 500);
    };
    window.addEventListener(BOOK_EVENT, onRequest);
    return () => window.removeEventListener(BOOK_EVENT, onRequest);
  }, []);

  const selectedDay = useMemo(
    () => days.find((d) => d.iso === dayIso),
    [days, dayIso],
  );

  const slots = useMemo(
    () => (selectedDay ? slotsForDay(selectedDay.day) : []),
    [selectedDay],
  );

  // تغيير اليوم قد يُلغي وقتاً لم يعد متاحاً (الخميس أقصر)
  useEffect(() => {
    if (time && !slots.includes(Number(time))) setTime("");
  }, [slots, time]);

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!service) next.service = c.errors.service;
    if (!name.trim()) next.name = c.errors.name;
    if (!selectedDay || selectedDay.closed) next.day = c.errors.day;
    if (!time) next.time = c.errors.time;
    return next;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const order: [FieldName, HTMLElement | null][] = [
        ["service", serviceRef.current],
        ["name", nameRef.current],
        ["day", dayRef.current],
        ["time", timeRef.current],
      ];
      order.find(([field]) => found[field])?.[1]?.focus();
      return;
    }

    const dateLabel = formatDayDate(
      selectedDay!.day,
      selectedDay!.dayOfMonth,
      selectedDay!.month,
      lang,
    );

    const m = c.message;
    const message = `${m.intro}
${m.service}: ${services.items[service as ServiceId].title}
${m.name}: ${name.trim()}
${m.day}: ${dateLabel}
${m.time}: ${formatTime(Number(time), lang)}
${m.notes}: ${notes.trim() || m.none}`;

    window.open(
      `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const fieldClass = (invalid?: string) =>
    `w-full rounded-xl border bg-porcelain px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/60 ${
      invalid ? "border-red-500" : "border-ink/15 focus:border-sage"
    }`;

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="scroll-mt-16 bg-linen py-12 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

        <Reveal delay={0.08}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="mt-10 rounded-card border border-ink/10 bg-porcelain p-6 sm:p-9"
          >
            {/* الخدمة */}
            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-ink">
                {c.service}
              </label>
              <select
                id="service"
                ref={serviceRef}
                value={service}
                onChange={(e) => {
                  setService(e.target.value as ServiceId);
                  setErrors((p) => ({ ...p, service: undefined }));
                }}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
                className={`mt-2 ${fieldClass(errors.service)}`}
              >
                <option value="">{c.servicePlaceholder}</option>
                {SERVICE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {services.items[id].title}
                  </option>
                ))}
              </select>
              <FieldError id="service-error" message={errors.service} />
            </div>

            {/* الاسم */}
            <div className="mt-6">
              <label htmlFor="name" className="block text-sm font-semibold text-ink">
                {c.name}
              </label>
              <input
                id="name"
                ref={nameRef}
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors((p) => ({ ...p, name: undefined }));
                }}
                placeholder={c.namePlaceholder}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`mt-2 ${fieldClass(errors.name)}`}
              />
              <FieldError id="name-error" message={errors.name} />
            </div>

            {/* اليوم */}
            <fieldset className="mt-6 min-w-0">
              <legend className="block text-sm font-semibold text-ink">
                {c.day}
              </legend>
              <p className="mt-1 text-xs text-muted">{c.dayHint}</p>

              <div
                ref={dayRef}
                tabIndex={-1}
                role="radiogroup"
                aria-label={c.day}
                aria-invalid={Boolean(errors.day)}
                aria-describedby={errors.day ? "day-error" : undefined}
                className="mt-3 grid grid-cols-5 gap-1.5 sm:flex sm:min-w-0 sm:snap-x sm:gap-2 sm:overflow-x-auto sm:pb-2"
              >
                {days.length === 0
                  ? Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        aria-hidden="true"
                        className="h-[4.6rem] w-full rounded-xl bg-linen sm:w-16 sm:shrink-0"
                      />
                    ))
                  : days.map((d) => {
                      const checked = d.iso === dayIso;
                      return (
                        <label
                          key={d.iso}
                          className={`flex h-[4.6rem] w-full cursor-pointer flex-col items-center justify-center rounded-xl border text-center transition-colors sm:w-16 sm:shrink-0 sm:snap-start ${
                            d.closed
                              ? "cursor-not-allowed border-ink/8 bg-linen/70 text-muted/45"
                              : checked
                                ? "border-sage bg-sage text-porcelain"
                                : "border-ink/15 bg-porcelain text-muted hover:border-sage"
                          } focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sage`}
                        >
                          <input
                            type="radio"
                            name="day"
                            value={d.iso}
                            disabled={d.closed}
                            checked={checked}
                            onChange={() => {
                              setDayIso(d.iso);
                              setErrors((p) => ({ ...p, day: undefined }));
                            }}
                            className="sr-only"
                          />
                          <span className="text-[0.68rem] font-semibold">
                            {DAY_SHORT[lang][d.day]}
                          </span>
                          <span className="tnum mt-0.5 text-lg font-bold leading-none">
                            {digits(d.dayOfMonth, lang)}
                          </span>
                          {d.closed && (
                            <span className="mt-0.5 text-[0.6rem]">{c.closedDay}</span>
                          )}
                        </label>
                      );
                    })}
              </div>
              <FieldError id="day-error" message={errors.day} />
            </fieldset>

            {/* الوقت */}
            <div className="mt-6">
              <label htmlFor="time" className="block text-sm font-semibold text-ink">
                {c.time}
              </label>
              <select
                id="time"
                ref={timeRef}
                value={time}
                disabled={slots.length === 0}
                onChange={(e) => {
                  setTime(e.target.value);
                  setErrors((p) => ({ ...p, time: undefined }));
                }}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "time-error" : undefined}
                className={`mt-2 disabled:cursor-not-allowed disabled:bg-porcelain disabled:text-muted/60 ${fieldClass(errors.time)}`}
              >
                <option value="">{c.timePlaceholder}</option>
                {slots.map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {formatTime(minutes, lang)}
                  </option>
                ))}
              </select>
              <FieldError id="time-error" message={errors.time} />
            </div>

            {/* ملاحظات */}
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-semibold text-ink">
                {c.notes}{" "}
                <span className="font-normal text-muted">({c.notesOptional})</span>
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={c.notesPlaceholder}
                className={`mt-2 resize-y ${fieldClass()}`}
              />
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-warm px-7 py-4 text-base font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {c.submit}
            </button>

            <p className="mt-3 text-center text-xs text-muted">{c.reassurance}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}
