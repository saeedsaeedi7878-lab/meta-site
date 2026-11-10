export const site = {
  name: "متاتست",
  nameEn: "MetaTest",
  url: "https://metatest.app",
  title: "متاتست — پلتفرم جامع ارزیابی و آزمون هوشمند",
  description:
    "متاتست یک پلتفرم جامع برای تمرین دروس، تحلیل عملکرد، ساخت آزمون آنلاین رقابتی و دسترسی به معلم خصوصی هوش مصنوعی است.",
  ogDescription:
    "با متاتست در محیطی شبیه بازی دروس خود را تمرین کنید، در آزمون‌های آنلاین رقابت کنید و از معلم خصوصی هوش مصنوعی کمک بگیرید.",
  keywords: [
    "متاتست",
    "آزمون آنلاین",
    "آزمون ساز",
    "معلم خصوصی هوش مصنوعی",
    "تمرین دروس مدرسه",
    "تحلیل تحصیلی",
  ],
  locale: "fa_IR",
  language: "fa",
  appUrl: "https://metatest.app/app/",
  contact: {
    phone: "09120578911",
    phoneHref: "tel:09120578911",
    email: "metatestinfo@gmail.com",
    emailHref: "mailto:metatestinfo@gmail.com",
    address: "مشهد، بلوار سجاد، امین غربی ۴، پلاک ۶، ساختمان A10",
    locality: "مشهد",
    streetAddress: "بلوار سجاد، امین غربی ۴، پلاک ۶، ساختمان A10",
    country: "IR",
  },
} as const;

/** Store or file URL. Replace null when a download destination is published. */
export const downloadUrl: string | null = null;
