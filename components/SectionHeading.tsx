import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
}) {
  const eyebrowColor = tone === "dark" ? "text-sage-ink" : "text-sage";
  const titleColor = tone === "dark" ? "text-ink" : "text-porcelain";
  const introColor = tone === "dark" ? "text-muted" : "text-linen/85";

  return (
    <Reveal className="max-w-2xl">
      <p className={`t-eyebrow ${eyebrowColor}`}>{eyebrow}</p>
      <h2 className={`t-h2 mt-4 font-heading font-normal ${titleColor}`}>{title}</h2>
      {intro && <p className={`t-body mt-5 ${introColor}`}>{intro}</p>}
    </Reveal>
  );
}
