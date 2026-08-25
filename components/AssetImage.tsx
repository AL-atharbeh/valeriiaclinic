import Image from "next/image";
import { assetExists } from "@/lib/assets";

/**
 * صورة من أصول العميل — أو مستطيل ‎--linen‎ يحمل اسم الملف المطلوب إن لم تصل بعد.
 * لا صور stock ولا صور مولّدة.
 */
export default function AssetImage({
  file,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className = "",
  imgClassName = "object-cover",
}: {
  file: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
}) {
  const src = `/assets/${file}`;

  if (!assetExists(file)) {
    return (
      <div
        className={`flex items-center justify-center bg-linen ring-1 ring-ink/8 ${className}`}
        style={fill ? undefined : { aspectRatio: `${width ?? 4} / ${height ?? 3}` }}
        role="img"
        aria-label={alt}
      >
        <span
          dir="ltr"
          className="px-3 text-center font-mono text-[0.68rem] leading-relaxed tracking-tight text-muted"
        >
          {src}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        {...(fill
          ? { fill: true }
          : { width: width ?? 1600, height: height ?? 1200 })}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={`${imgClassName} ${fill ? "" : "h-full w-full"}`}
      />
    </div>
  );
}
