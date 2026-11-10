export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  featured: boolean;
  /** True until the owner replaces this card with a published tariff. */
  preview: boolean;
};

/**
 * Layout preview only. Names, prices, periods, and benefits are not published.
 * Replace this array before the plans section is treated as a real offer.
 */
export const plans: Plan[] = [
  {
    id: "preview-start",
    name: "نام پلن",
    price: "اعلام نشده",
    period: "دوره پرداخت",
    description: "توضیح کوتاه این پلن بعد از اعلام تعرفه اینجا می‌نشیند.",
    features: ["مزیت اعلام‌شده", "مزیت اعلام‌شده", "مزیت اعلام‌شده"],
    cta: "ورود به برنامه",
    featured: false,
    preview: true,
  },
  {
    id: "preview-focus",
    name: "نام پلن ویژه",
    price: "اعلام نشده",
    period: "دوره پرداخت",
    description: "کارت میانی فقط برای نشان دادن تمایز بصری پلن ویژه است.",
    features: ["مزیت اعلام‌شده", "مزیت اعلام‌شده", "مزیت اعلام‌شده", "مزیت اعلام‌شده"],
    cta: "ورود به برنامه",
    featured: true,
    preview: true,
  },
  {
    id: "preview-full",
    name: "نام پلن",
    price: "اعلام نشده",
    period: "دوره پرداخت",
    description: "هیچ قیمت یا تعهدی از این کارت برداشت نمی‌شود.",
    features: ["مزیت اعلام‌شده", "مزیت اعلام‌شده", "مزیت اعلام‌شده"],
    cta: "ورود به برنامه",
    featured: false,
    preview: true,
  },
];
