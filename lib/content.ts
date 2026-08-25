/**
 * كل نصوص الموقع — عربي وإنجليزي.
 * لا تكتب نصاً داخل المكوّنات. أي تعديل لغوي يبدأ من هنا.
 *
 * ضوابط وزارة الصحة سارية على كل سطر في هذا الملف:
 * لا وعد بنتيجة · لا أسعار · لا عدد جلسات · لا مدة بقاء نتيجة
 * لا أسماء تجارية للمنتجات · لا أسماء مشاهير · لا مقارنة تفضيلية.
 */

export type Lang = "ar" | "en";
export const LANGS: readonly Lang[] = ["ar", "en"] as const;
export const DEFAULT_LANG: Lang = "ar";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export type ServiceId =
  | "botox"
  | "filler"
  | "glow"
  | "laser"
  | "acne"
  | "consult";

export const SERVICE_IDS: readonly ServiceId[] = [
  "botox",
  "filler",
  "glow",
  "laser",
  "acne",
  "consult",
] as const;

export type ServiceCopy = { title: string; body: string };

/** صور المعرض — الملف الموجود يُعرض، والناقص يظهر كمستطيل يحمل اسمه المطلوب. */
export type GalleryEntry = {
  file: string;
  ratio: "tall" | "wide";
  /** صور «قبل وبعد» تحمل تنويه اختلاف النتائج إلزامياً تحت كل واحدة. */
  beforeAfter?: boolean;
};

export const GALLERY: readonly GalleryEntry[] = [
  { file: "clinic-treatment.jpg", ratio: "wide" },
  { file: "clinic-reception.jpg", ratio: "tall" },
  { file: "clinic-room.jpg", ratio: "tall" },
  { file: "clinic-view.jpg", ratio: "wide" },
] as const;

type Dict = {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogSubtitle: string;
  };
  nav: { skipToContent: string; toggleLabel: string; otherLangName: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    logoAlt: string;
    floorLabel: string;
    altitudeLabel: string;
  };
  badge: {
    open: (closesAt: string) => string;
    closingSoon: (minutes: string) => string;
    closedToday: (day: string, at: string) => string;
    closedTodayLater: (at: string) => string;
    closedTomorrow: (at: string) => string;
    closedNamedDay: (day: string, at: string) => string;
    srPrefix: string;
    fallback: string;
  };
  trust: {
    ratingLabel: string;
    reviewsLabel: string;
    experienceLabel: string;
    licenceLabel: string;
    addressLabel: string;
    addressValue: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    bookThis: string;
    items: Record<ServiceId, ServiceCopy>;
  };
  doctor: {
    eyebrow: string;
    title: string;
    body: string[];
    licenceLine: string;
    experienceLine: string;
    instagramCta: string;
    photoAlt: string;
  };
  why: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    intro: string;
    imageAlt: (n: string) => string;
    resultsVary: string;
    open: string;
    close: string;
    next: string;
    prev: string;
    counter: (current: string, total: string) => string;
  };
  location: {
    eyebrow: string;
    title: string;
    floorNotice: string;
    floorHint: string;
    addressLabel: string;
    hoursTitle: string;
    closed: string;
    today: string;
    mapsCta: string;
    callCta: string;
    mapTitle: string;
  };
  booking: {
    eyebrow: string;
    title: string;
    intro: string;
    service: string;
    servicePlaceholder: string;
    name: string;
    namePlaceholder: string;
    day: string;
    dayHint: string;
    closedDay: string;
    time: string;
    timePlaceholder: string;
    notes: string;
    notesOptional: string;
    notesPlaceholder: string;
    submit: string;
    reassurance: string;
    errors: Record<"service" | "name" | "day" | "time", string>;
    message: {
      intro: string;
      service: string;
      name: string;
      day: string;
      time: string;
      notes: string;
      none: string;
    };
  };
  footer: {
    licenceLabel: string;
    phoneLabel: string;
    whatsappLabel: string;
    instagramLabel: string;
    doctorInstagramLabel: string;
    addressLabel: string;
    hoursLabel: string;
    hoursValue: string;
    rights: string;
    preview: string;
    logoAlt: string;
  };
  floating: { whatsapp: string };
};

export const CONTENT: Record<Lang, Dict> = {
  ar: {
    meta: {
      title: "عيادة جلدية وتجميل الجابرية | د. فاليريا مينشينكو — الكويت",
      description:
        "عيادة د. فاليريا مينشينكو للجلدية والتجميل في الجابرية — برج مزايا الجديد، الدور ١٨. بوتوكس وفيلر وليزر ونضارة البشرة وعلاج حب الشباب والندبات، بخبرة ١٧ سنة. احجزي استشارتك عبر واتساب.",
      ogTitle: "عيادة جلدية وتجميل | د. فاليريا",
      ogSubtitle: "الجابرية — برج مزايا الجديد، الدور ١٨",
    },
    nav: {
      skipToContent: "تخطَّ إلى المحتوى",
      toggleLabel: "تبديل لغة الموقع إلى الإنجليزية",
      otherLangName: "English",
    },
    hero: {
      eyebrow: "الجابرية · الكويت",
      title: "بشرتك تستحق رأياً صادقاً",
      subtitle:
        "١٧ سنة خبرة · الجابرية · الدور ١٨ — تقييم صريح لبشرتك قبل أي إجراء، وخطة تناسب حالتك وحدها.",
      primaryCta: "احجزي استشارتك",
      secondaryCta: "تعرّفي على الخدمات",
      logoAlt: "شعار عيادة د. فاليريا للجلدية والتجميل",
      floorLabel: "الدور ١٨",
      altitudeLabel: "مؤشر ارتفاع يشير إلى الدور الثامن عشر",
    },
    badge: {
      open: (closesAt) => `مفتوح الآن — حتى ${closesAt}`,
      closingSoon: (minutes) => `يغلق بعد ${minutes} دقيقة`,
      closedToday: (day, at) => `مغلق اليوم — نفتح ${day} ${at}`,
      closedTodayLater: (at) => `مغلق الآن — نفتح اليوم ${at}`,
      closedTomorrow: (at) => `مغلق الآن — نفتح غداً ${at}`,
      closedNamedDay: (day, at) => `مغلق الآن — نفتح ${day} ${at}`,
      srPrefix: "حالة الدوام:",
      fallback: "السبت–الخميس ٩:٠٠ص – ٩:٠٠م",
    },
    trust: {
      ratingLabel: "تقييم قوقل",
      reviewsLabel: "تقييم على قوقل",
      experienceLabel: "سنة خبرة",
      licenceLabel: "ترخيص العيادة",
      addressLabel: "الموقع",
      addressValue: "الجابرية — مزايا، الدور ١٨",
    },
    services: {
      eyebrow: "الخدمات",
      title: "ما نقدّمه في العيادة",
      intro:
        "كل إجراء يبدأ بتقييم لحالة بشرتك. إن لم يكن الإجراء مناسباً لكِ، ستسمعين ذلك بوضوح.",
      bookThis: "احجزي لهذه الخدمة",
      items: {
        botox: {
          title: "بوتوكس",
          body: "حقن موضعية للعضلات المسؤولة عن خطوط التعبير في الوجه، تُحدَّد مواضعها بعد فحص حركة الوجه.",
        },
        filler: {
          title: "فيلر",
          body: "حقن مواد مالئة لدعم ملامح الوجه أو الشفاه، ضمن خطة تراعي تناسق الوجه الطبيعي.",
        },
        glow: {
          title: "نضارة وتجديد البشرة",
          body: "جلسات عناية بالبشرة تستهدف الملمس ولون البشرة غير الموحّد، تُختار حسب نوع بشرتك.",
        },
        laser: {
          title: "ليزر",
          body: "جلسات ليزر بأجهزة معتمدة، تُضبط إعداداتها حسب نوع البشرة والمنطقة المستهدفة.",
        },
        acne: {
          title: "علاج حب الشباب والندبات",
          body: "تشخيص لسبب حب الشباب ثم خطة علاجية للبشرة النشطة ولآثار الندبات السطحية.",
        },
        consult: {
          title: "استشارة جلدية",
          body: "فحص للبشرة ومناقشة ما يشغلك، مع توضيح الخيارات المتاحة وما لا يلزمك منها.",
        },
      },
    },
    doctor: {
      eyebrow: "عن الطبيبة",
      title: "د. فاليريا مينشينكو",
      body: [
        "أمضيت سبعة عشر عاماً في طب الجلد والتجميل، وتعلّمت خلالها أن أصعب ما في هذا العمل ليس تنفيذ الإجراء، بل تحديد ما إذا كان يلزم أصلاً.",
        "أبدأ كل موعد بفحص البشرة والاستماع إلى ما يشغل المريضة. أحياناً تكون الإجابة إجراءً بسيطاً، وأحياناً تكون عناية منزلية ومتابعة، وأحياناً تكون أن الوضع لا يحتاج تدخلاً. أقول ذلك كما هو.",
      ],
      licenceLine: "ترخيص العيادة",
      experienceLine: "سنة خبرة في التجميل",
      instagramCta: "حساب الطبيبة على إنستقرام",
      photoAlt: "د. فاليريا مينشينكو، طبيبة الجلدية والتجميل في العيادة",
    },
    why: {
      eyebrow: "لماذا العيادة",
      title: "أربعة أشياء ثابتة في كل موعد",
      items: [
        {
          title: "تقييم صريح قبل أي إجراء",
          body: "نوضّح ما يناسب حالتك وما لا يلزمك، قبل أن تقرري.",
        },
        {
          title: "مواعيد منضبطة بلا انتظار",
          body: "الموعد يبدأ في وقته، والجدول مبني على ذلك.",
        },
        {
          title: "أجهزة معتمدة",
          body: "الأجهزة والمواد المستخدمة معتمدة، وتُضبط إعداداتها لكل حالة.",
        },
        {
          title: "متابعة بعد الجلسة",
          body: "نبقى على تواصل بعد الموعد للاطمئنان والإجابة على أسئلتك.",
        },
      ],
    },
    gallery: {
      eyebrow: "من العيادة",
      title: "لمحة عن المكان",
      intro: "صور من العيادة في الدور الثامن عشر من برج مزايا الجديد.",
      imageAlt: (n) => `صورة رقم ${n} من عيادة د. فاليريا في الجابرية`,
      resultsVary: "النتائج تختلف من شخص لآخر",
      open: "تكبير الصورة",
      close: "إغلاق",
      next: "الصورة التالية",
      prev: "الصورة السابقة",
      counter: (current, total) => `الصورة ${current} من ${total}`,
    },
    location: {
      eyebrow: "الموقع والدوام",
      title: "الجابرية — برج مزايا الجديد",
      floorNotice: "برج مزايا الجديد — الدور ١٨",
      floorHint:
        "العيادة في الدور الثامن عشر. اصعدي بالمصعد مباشرةً إلى ١٨.",
      addressLabel: "العنوان",
      hoursTitle: "أوقات الدوام",
      closed: "مغلق",
      today: "اليوم",
      mapsCta: "افتح في خرائط قوقل",
      callCta: "اتصلي بالعيادة",
      mapTitle: "خريطة موقع عيادة د. فاليريا في الجابرية",
    },
    booking: {
      eyebrow: "الحجز",
      title: "احجزي استشارتك",
      intro:
        "املئي الحقول وسيفتح واتساب برسالة جاهزة. لا نحفظ بياناتك على أي خادم.",
      service: "الخدمة",
      servicePlaceholder: "اختاري الخدمة",
      name: "الاسم",
      namePlaceholder: "الاسم الكامل",
      day: "اليوم المفضل",
      dayHint: "الجمعة مغلق",
      closedDay: "مغلق",
      time: "الوقت المفضل",
      timePlaceholder: "اختاري الوقت",
      notes: "ملاحظات",
      notesOptional: "اختياري",
      notesPlaceholder: "أي شيء تودّين ذكره قبل الموعد",
      submit: "أرسلي عبر واتساب",
      reassurance: "سيتم تأكيد الموعد من قبل العيادة عبر واتساب",
      errors: {
        service: "اختاري الخدمة من فضلك",
        name: "اكتبي اسمك من فضلك",
        day: "اختاري يوماً متاحاً",
        time: "اختاري الوقت المفضل",
      },
      message: {
        intro: "مرحباً، أرغب بحجز موعد في عيادة د. فاليريا",
        service: "الخدمة",
        name: "الاسم",
        day: "اليوم المفضل",
        time: "الوقت المفضل",
        notes: "ملاحظات",
        none: "لا يوجد",
      },
    },
    footer: {
      licenceLabel: "ترخيص العيادة",
      phoneLabel: "الهاتف",
      whatsappLabel: "واتساب",
      instagramLabel: "إنستقرام العيادة",
      doctorInstagramLabel: "إنستقرام الطبيبة",
      addressLabel: "العنوان",
      hoursLabel: "الدوام",
      hoursValue: "السبت–الخميس ٩:٠٠ص – ٩:٠٠م · الجمعة مغلق",
      rights: "جميع الحقوق محفوظة",
      preview: "معاينة تصميم غير منشورة — أُعدّت خصيصاً لعيادة د. فاليريا",
      logoAlt: "شعار عيادة د. فاليريا",
    },
    floating: { whatsapp: "تواصلي معنا عبر واتساب" },
  },

  en: {
    meta: {
      title: "Dermatology & Aesthetics Clinic Jabriya | Dr. Valeriia Minchenko — Kuwait",
      description:
        "Dr. Valeriia Minchenko's dermatology and aesthetics clinic in Jabriya — New Mazaya Tower, Floor 18. Botox, fillers, laser, skin rejuvenation, acne and scar care, with 17 years of experience. Book your consultation on WhatsApp.",
      ogTitle: "Dr. Valeriia Clinic",
      ogSubtitle: "Jabriya — New Mazaya Tower, Floor 18",
    },
    nav: {
      skipToContent: "Skip to content",
      toggleLabel: "Switch site language to Arabic",
      otherLangName: "العربية",
    },
    hero: {
      eyebrow: "Jabriya · Kuwait",
      title: "Your skin deserves an honest opinion",
      subtitle:
        "17 years of experience · Jabriya · Floor 18 — a candid assessment of your skin before any procedure, and a plan built for your case alone.",
      primaryCta: "Book a consultation",
      secondaryCta: "See the services",
      logoAlt: "Dr. Valeriia dermatology and aesthetics clinic logo",
      floorLabel: "Floor 18",
      altitudeLabel: "Altitude marker pointing to the eighteenth floor",
    },
    badge: {
      open: (closesAt) => `Open now — until ${closesAt}`,
      closingSoon: (minutes) => `Closing in ${minutes} minutes`,
      closedToday: (day, at) => `Closed today — open ${day} at ${at}`,
      closedTodayLater: (at) => `Closed now — opens today at ${at}`,
      closedTomorrow: (at) => `Closed now — opens tomorrow at ${at}`,
      closedNamedDay: (day, at) => `Closed now — opens ${day} at ${at}`,
      srPrefix: "Opening status:",
      fallback: "Saturday–Thursday 9:00 AM – 9:00 PM",
    },
    trust: {
      ratingLabel: "Google rating",
      reviewsLabel: "Google reviews",
      experienceLabel: "years of experience",
      licenceLabel: "Clinic licence",
      addressLabel: "Location",
      addressValue: "Jabriya — Mazaya, Floor 18",
    },
    services: {
      eyebrow: "Services",
      title: "What we offer at the clinic",
      intro:
        "Every procedure begins with an assessment of your skin. If a procedure isn't right for you, you will hear that plainly.",
      bookThis: "Book this service",
      items: {
        botox: {
          title: "Botulinum toxin",
          body: "Targeted injections into the muscles behind facial expression lines, mapped after examining how your face moves.",
        },
        filler: {
          title: "Dermal fillers",
          body: "Injectable fillers to support facial or lip contours, within a plan that respects your natural proportions.",
        },
        glow: {
          title: "Skin rejuvenation",
          body: "Skin care sessions addressing texture and uneven tone, selected according to your skin type.",
        },
        laser: {
          title: "Laser",
          body: "Laser sessions on approved devices, with settings adjusted to your skin type and the treated area.",
        },
        acne: {
          title: "Acne & scar care",
          body: "Diagnosis of the cause of acne, then a plan for active skin and for the marks left by superficial scarring.",
        },
        consult: {
          title: "Dermatology consultation",
          body: "An examination and a conversation about what concerns you, with the available options — and the ones you don't need — made clear.",
        },
      },
    },
    doctor: {
      eyebrow: "About the doctor",
      title: "Dr. Valeriia Minchenko",
      body: [
        "I have spent seventeen years in dermatology and aesthetics, and what I learned is that the hard part of this work is not performing the procedure — it is deciding whether it is needed at all.",
        "I start every appointment by examining the skin and listening to what is on the patient's mind. Sometimes the answer is a simple procedure, sometimes it is home care and follow-up, and sometimes it is that nothing needs to be done. I say so.",
      ],
      licenceLine: "Clinic licence",
      experienceLine: "years in aesthetics",
      instagramCta: "The doctor's Instagram",
      photoAlt: "Dr. Valeriia Minchenko, dermatology and aesthetics physician at the clinic",
    },
    why: {
      eyebrow: "Why this clinic",
      title: "Four things that hold true at every appointment",
      items: [
        {
          title: "A candid assessment first",
          body: "We explain what suits your case and what you do not need, before you decide.",
        },
        {
          title: "Appointments that run on time",
          body: "Your appointment starts when it is scheduled, and the day is built around that.",
        },
        {
          title: "Approved devices",
          body: "The devices and materials used are approved, and their settings are adjusted per case.",
        },
        {
          title: "Follow-up after the session",
          body: "We stay in touch after your visit to check in and answer your questions.",
        },
      ],
    },
    gallery: {
      eyebrow: "Inside the clinic",
      title: "A look at the space",
      intro: "Photographs from the clinic on the eighteenth floor of New Mazaya Tower.",
      imageAlt: (n) => `Photograph ${n} from Dr. Valeriia's clinic in Jabriya`,
      resultsVary: "Results vary from person to person",
      open: "Enlarge image",
      close: "Close",
      next: "Next image",
      prev: "Previous image",
      counter: (current, total) => `Image ${current} of ${total}`,
    },
    location: {
      eyebrow: "Location & hours",
      title: "Jabriya — New Mazaya Tower",
      floorNotice: "New Mazaya Tower — Floor 18",
      floorHint: "The clinic is on the eighteenth floor. Take the lift straight to 18.",
      addressLabel: "Address",
      hoursTitle: "Opening hours",
      closed: "Closed",
      today: "Today",
      mapsCta: "Open in Google Maps",
      callCta: "Call the clinic",
      mapTitle: "Map showing Dr. Valeriia's clinic in Jabriya",
    },
    booking: {
      eyebrow: "Booking",
      title: "Book your consultation",
      intro:
        "Fill in the fields and WhatsApp will open with a ready message. Nothing is stored on any server.",
      service: "Service",
      servicePlaceholder: "Choose a service",
      name: "Name",
      namePlaceholder: "Full name",
      day: "Preferred day",
      dayHint: "Closed on Friday",
      closedDay: "Closed",
      time: "Preferred time",
      timePlaceholder: "Choose a time",
      notes: "Notes",
      notesOptional: "optional",
      notesPlaceholder: "Anything you would like to mention before the appointment",
      submit: "Send on WhatsApp",
      reassurance: "The clinic will confirm your appointment on WhatsApp",
      errors: {
        service: "Please choose a service",
        name: "Please enter your name",
        day: "Please choose an available day",
        time: "Please choose a preferred time",
      },
      message: {
        intro: "Hello, I would like to book an appointment at Dr. Valeriia Clinic",
        service: "Service",
        name: "Name",
        day: "Preferred day",
        time: "Preferred time",
        notes: "Notes",
        none: "None",
      },
    },
    footer: {
      licenceLabel: "Clinic licence",
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      instagramLabel: "Clinic Instagram",
      doctorInstagramLabel: "Doctor's Instagram",
      addressLabel: "Address",
      hoursLabel: "Hours",
      hoursValue: "Saturday–Thursday 9:00 AM – 9:00 PM · Closed Friday",
      rights: "All rights reserved",
      preview: "Unpublished design preview — prepared for Dr. Valeriia Clinic",
      logoAlt: "Dr. Valeriia Clinic logo",
    },
    floating: { whatsapp: "Message us on WhatsApp" },
  },
};
