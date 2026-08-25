/**
 * ثوابت العيادة. عدّل هذه القيم فقط — لا تكرر الأرقام في المكوّنات.
 */
export const CLINIC = {
  nameAr: "عيادة جلدية وتجميل | د. فاليريا",
  nameEn: "Dr. Valeriia Clinic",
  doctorAr: "د. فاليريا مينشينكو",
  doctorEn: "Dr. Valeriia Minchenko",
  phone: "+96594993909",
  phoneDisplay: "+965 9499 3909",
  whatsapp: "96594993909",
  instagram: "https://instagram.com/dr.valeriiaclinic",
  instagramHandle: "@dr.valeriiaclinic",
  doctorInstagram: "https://instagram.com/dr.valeriia_skinpro",
  doctorInstagramHandle: "@dr.valeriia_skinpro",
  licence: "189",
  experienceYears: 17,
  floor: 18,
  rating: 4.9,
  reviews: 87,
  lat: 29.3220879,
  lng: 48.0138703,
  addressAr: "برج مزايا الجديد، الدور ١٨، الجابرية، الكويت",
  addressEn: "New Mazaya Tower, Floor 18, Jabriya, Kuwait",
  /** استبدله بالنطاق الحقيقي عند النشر */
  siteUrl: "https://dr-valeriia-clinic.example.com",
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${CLINIC.lat},${CLINIC.lng}`;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${CLINIC.lat},${CLINIC.lng}&hl=ar&z=17&output=embed`;
