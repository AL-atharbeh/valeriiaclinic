import Reveal from "./Reveal";
import AssetImage from "./AssetImage";
import { InstagramIcon } from "./icons";
import { CLINIC } from "@/lib/clinic";
import { CONTENT, type Lang } from "@/lib/content";
import { digits } from "@/lib/format";

export default function AboutDoctor({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].doctor;

  return (
    <section className="bg-linen py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <AssetImage
              file="doctor.jpg"
              alt={c.photoAlt}
              width={350}
              height={440}
              sizes="(max-width: 1024px) 80vw, 22rem"
              className="mx-auto w-full max-w-xs rounded-card lg:max-w-none"
            />
          </Reveal>

          <Reveal delay={0.09}>
            <p className="t-eyebrow text-sage-ink">{c.eyebrow}</p>
            <h2 className="t-h2 mt-4 font-heading font-normal text-ink">
              {c.title}
            </h2>

            <div className="mt-6 space-y-4">
              {c.body.map((paragraph) => (
                <p key={paragraph} className="t-body max-w-xl text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="text-xs font-semibold text-muted">
                  {c.experienceLine}
                </dt>
                <dd className="tnum mt-1 font-heading text-2xl text-ink">
                  {digits(CLINIC.experienceYears, lang)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-muted">
                  {c.licenceLine}
                </dt>
                <dd className="tnum mt-1 font-heading text-2xl text-ink">
                  {digits(CLINIC.licence, lang)}
                </dd>
              </div>
            </dl>

            <a
              href={CLINIC.doctorInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-ink/15 transition-colors duration-200 hover:bg-porcelain"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>{c.instagramCta}</span>
              <span dir="ltr" className="text-muted">
                {CLINIC.doctorInstagramHandle}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
