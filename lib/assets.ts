import fs from "node:fs";
import path from "node:path";

/**
 * فحص أصول العميل على الخادم وقت البناء.
 * الصور الناقصة تُستبدل بمستطيل ‎--haze‎ مكتوب عليه اسم الملف المطلوب،
 * فلا نستخدم صور stock ولا صوراً مولّدة.
 */
const ASSET_DIR = path.join(process.cwd(), "public", "assets");

export function assetExists(file: string): boolean {
  try {
    return fs.statSync(path.join(ASSET_DIR, file)).isFile();
  } catch {
    return false;
  }
}

/** يرجّع مسارات public لكل ملف يبدأ بالبادئة المطلوبة، مرتبة أبجدياً. */
export function listAssets(prefix: string): string[] {
  try {
    return fs
      .readdirSync(ASSET_DIR)
      .filter(
        (f) =>
          f.startsWith(prefix) && /\.(webp|jpg|jpeg|png|avif)$/i.test(f),
      )
      .sort((a, b) => a.localeCompare(b, "en"))
      .map((f) => `/assets/${f}`);
  } catch {
    return [];
  }
}
