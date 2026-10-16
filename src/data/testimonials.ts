import type { LocalizedText } from "@/types/product";

/** Home-page testimonials. Names are invented; they are not real customers. */
export const testimonials: Array<{ author: string; city: LocalizedText; rating: number; body: LocalizedText }> = [
  {
    author: "Layla H.",
    city: { en: "Cairo", ar: "القاهرة" },
    rating: 5,
    body: {
      en: "Ordered the Aurora headphones in the evening and they were at my door the next afternoon. The noise cancelling is brilliant.",
      ar: "طلبت سماعات أورورا مساءً ووصلت إلى بابي ظهر اليوم التالي. خاصية إلغاء الضوضاء رائعة.",
    },
  },
  {
    author: "Omar K.",
    city: { en: "Alexandria", ar: "الإسكندرية" },
    rating: 5,
    body: {
      en: "Paying cash on delivery made my first order easy, and returning a jacket that didn't fit took two minutes.",
      ar: "الدفع عند الاستلام سهّل طلبي الأول، وإرجاع جاكيت لم يناسبني استغرق دقيقتين فقط.",
    },
  },
  {
    author: "Sara M.",
    city: { en: "Giza", ar: "الجيزة" },
    rating: 4,
    body: {
      en: "Great prices on laptops and the WhatsApp ordering is so convenient. I got answers to my questions within minutes.",
      ar: "أسعار رائعة للابتوبات والطلب عبر واتساب مريح جدًا. حصلت على إجابات لأسئلتي خلال دقائق.",
    },
  },
];
