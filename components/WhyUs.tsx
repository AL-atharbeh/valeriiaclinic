import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CONTENT, type Lang } from "@/lib/content";
import { digits } from "@/lib/format";

export default function WhyUs({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].why;

  return (
    <section className="bg-porcelain py-12 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} />

        <ol className="mt-9 grid gap-x-10 gap-y-7 sm:mt-14 sm:gap-y-10 sm:grid-cols-2">
          {c.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.09}>
              <li className="flex gap-5 border-t border-ink/10 pt-6">
                <span
                  className="tnum shrink-0 font-heading text-lg text-sage-ink"
                  aria-hidden="true"
                >
                  {digits(String(i + 1).padStart(2, "0"), lang)}
                </span>
                <div>
                  <h3 className="t-h3 font-heading font-normal text-ink">
                    {item.title}
                  </h3>
                  <p className="t-body mt-2 max-w-md text-muted">{item.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
