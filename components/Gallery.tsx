import GalleryGrid from "./GalleryLightbox";
import SectionHeading from "./SectionHeading";
import { assetExists } from "@/lib/assets";
import { GALLERY, CONTENT, type Lang } from "@/lib/content";

/**
 * الصور الموجودة فعلاً تُعرض وتُفتح في lightbox،
 * والناقصة تظهر كمستطيل ‎--linen‎ يحمل اسم الملف المطلوب من العميل.
 */
export default function Gallery({ lang }: { lang: Lang }) {
  const c = CONTENT[lang].gallery;

  const entries = GALLERY.map((entry) => ({
    ...entry,
    beforeAfter: entry.beforeAfter ?? false,
    exists: assetExists(entry.file),
  }));

  return (
    <section id="gallery" className="scroll-mt-20 bg-linen py-12 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} intro={c.intro} />
        <GalleryGrid entries={entries} lang={lang} />
      </div>
    </section>
  );
}
