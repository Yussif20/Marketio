import type { LocalizedText } from "@/types/product";

const t = (en: string, ar: string): LocalizedText => ({ en, ar });

export interface FaqGroup {
  title: LocalizedText;
  items: Array<{ q: LocalizedText; a: LocalizedText }>;
}

export const faq: FaqGroup[] = [
  {
    title: t("Orders", "الطلبات"),
    items: [
      {
        q: t("How do I place an order?", "كيف أقدّم طلبًا؟"),
        a: t("Add products to your cart, open the cart and choose checkout. You can pay by card, pay cash on delivery or send the order to us on WhatsApp.", "أضف المنتجات إلى السلة، ثم افتح السلة واختر المتابعة إلى الدفع. يمكنك الدفع بالبطاقة أو نقدًا عند الاستلام أو إرسال الطلب إلينا عبر واتساب."),
      },
      {
        q: t("Can I change or cancel my order?", "هل يمكنني تعديل طلبي أو إلغاؤه؟"),
        a: t("Yes, until it ships. Contact us with your order number and we'll update it for you.", "نعم، حتى يتم شحنه. تواصل معنا برقم الطلب وسنعدّله لك."),
      },
      {
        q: t("Do I need an account?", "هل أحتاج إلى حساب؟"),
        a: t("No. Guest checkout works for every payment method; an account just lets you see your order history.", "لا. يمكنك إتمام الطلب كضيف بكل طرق الدفع؛ الحساب يتيح لك فقط متابعة طلباتك السابقة."),
      },
    ],
  },
  {
    title: t("Shipping", "الشحن"),
    items: [
      {
        q: t("How much is delivery?", "كم تكلفة التوصيل؟"),
        a: t("Delivery is free on orders over $140. Below that it costs $9.99.", "التوصيل مجاني للطلبات فوق 140 دولارًا، وتكلفته 9.99 دولار لما دون ذلك."),
      },
      {
        q: t("How long does delivery take?", "كم يستغرق التوصيل؟"),
        a: t("Most orders arrive in 1–3 working days in major cities and 3–5 days elsewhere.", "تصل معظم الطلبات خلال 1–3 أيام عمل في المدن الكبرى و3–5 أيام في باقي المناطق."),
      },
    ],
  },
  {
    title: t("Returns", "الإرجاع"),
    items: [
      {
        q: t("What is your return policy?", "ما هي سياسة الإرجاع؟"),
        a: t("You can return unused items in their original packaging within 30 days for a full refund.", "يمكنك إرجاع المنتجات غير المستخدمة في عبوتها الأصلية خلال 30 يومًا واسترداد كامل المبلغ."),
      },
      {
        q: t("How do refunds work?", "كيف يتم استرداد المبلغ؟"),
        a: t("Card payments are refunded to the same card within 5–10 days. Cash-on-delivery orders are refunded by bank transfer or wallet.", "تُسترد مدفوعات البطاقة إلى نفس البطاقة خلال 5–10 أيام، وتُسترد طلبات الدفع عند الاستلام بتحويل بنكي أو محفظة إلكترونية."),
      },
    ],
  },
  {
    title: t("Payment", "الدفع"),
    items: [
      {
        q: t("Which payment methods do you accept?", "ما طرق الدفع المتاحة؟"),
        a: t("Credit and debit cards through Stripe, cash on delivery, and orders confirmed over WhatsApp.", "البطاقات الائتمانية والمدينة عبر Stripe، والدفع عند الاستلام، والطلبات المؤكدة عبر واتساب."),
      },
      {
        q: t("Is paying by card safe?", "هل الدفع بالبطاقة آمن؟"),
        a: t("Yes. Card details are entered on Stripe's secure checkout page and never reach our servers.", "نعم. تُدخل بيانات البطاقة في صفحة الدفع الآمنة الخاصة بـ Stripe ولا تصل إلى خوادمنا أبدًا."),
      },
    ],
  },
];

export interface PolicyPage {
  title: LocalizedText;
  intro: LocalizedText;
  updated: string;
  sections: Array<{ heading: LocalizedText; body: LocalizedText }>;
}

export const policies: Record<"shipping" | "privacy" | "terms", PolicyPage> = {
  shipping: {
    title: t("Shipping & returns", "الشحن والإرجاع"),
    intro: t("Everything about delivery times, costs and sending items back.", "كل ما يخص مواعيد التوصيل وتكاليفه وإرجاع المنتجات."),
    updated: "2026-10-01",
    sections: [
      { heading: t("Delivery costs", "تكاليف التوصيل"), body: t("Free delivery on orders over $140; $9.99 for smaller orders.", "توصيل مجاني للطلبات فوق 140 دولارًا، و9.99 دولار للطلبات الأصغر.") },
      { heading: t("Delivery times", "مواعيد التوصيل"), body: t("1–3 working days in major cities, 3–5 working days elsewhere. You'll get updates by email or WhatsApp.", "من 1 إلى 3 أيام عمل في المدن الكبرى، ومن 3 إلى 5 أيام عمل في باقي المناطق. ستصلك التحديثات عبر البريد أو واتساب.") },
      { heading: t("Returns", "الإرجاع"), body: t("Return unused items in their original packaging within 30 days. Contact us to arrange a free pickup.", "أعد المنتجات غير المستخدمة في عبوتها الأصلية خلال 30 يومًا. تواصل معنا لترتيب استلام مجاني.") },
      { heading: t("Damaged items", "المنتجات التالفة"), body: t("If something arrives damaged, send us a photo within 48 hours and we'll replace it at no cost.", "إذا وصلك منتج تالف، أرسل لنا صورة خلال 48 ساعة وسنستبدله دون أي تكلفة.") },
    ],
  },
  privacy: {
    title: t("Privacy policy", "سياسة الخصوصية"),
    intro: t("This is a demo store. This page shows how a real store would explain its use of data.", "هذا متجر تجريبي. توضح هذه الصفحة كيف يشرح متجر حقيقي استخدامه للبيانات."),
    updated: "2026-10-01",
    sections: [
      { heading: t("What we collect", "ما الذي نجمعه"), body: t("Your name, contact details and address when you order, and basic, anonymous usage data to improve the site.", "اسمك وبيانات التواصل وعنوانك عند الطلب، وبيانات استخدام أساسية مجهولة لتحسين الموقع.") },
      { heading: t("How we use it", "كيف نستخدمها"), body: t("Only to process and deliver your orders, answer your messages and, if you subscribe, send our newsletter.", "فقط لمعالجة طلباتك وتوصيلها، والرد على رسائلك، وإرسال النشرة البريدية إذا اشتركت.") },
      { heading: t("Payments", "المدفوعات"), body: t("Card payments are handled by Stripe. We never see or store your full card number.", "تتولى Stripe معالجة مدفوعات البطاقات. لا نرى رقم بطاقتك الكامل ولا نخزنه أبدًا.") },
      { heading: t("Your rights", "حقوقك"), body: t("You can ask us to see, correct or delete your data at any time.", "يمكنك أن تطلب منا الاطلاع على بياناتك أو تصحيحها أو حذفها في أي وقت.") },
    ],
  },
  terms: {
    title: t("Terms of use", "شروط الاستخدام"),
    intro: t("This is a demo store: products, prices and orders are fictional and nothing is shipped.", "هذا متجر تجريبي: المنتجات والأسعار والطلبات غير حقيقية ولا يتم شحن أي شيء."),
    updated: "2026-10-01",
    sections: [
      { heading: t("Using the site", "استخدام الموقع"), body: t("You may browse and place test orders. Card payments run in Stripe test mode, so no real money is charged.", "يمكنك التصفح وتقديم طلبات تجريبية. مدفوعات البطاقات تعمل في وضع الاختبار لدى Stripe، فلا يتم خصم أي مبلغ حقيقي.") },
      { heading: t("Prices and stock", "الأسعار والمخزون"), body: t("Prices and stock levels are examples and may change at any time.", "الأسعار ومستويات المخزون أمثلة وقد تتغير في أي وقت.") },
      { heading: t("Content", "المحتوى"), body: t("Product photos are AI-generated and all brands are invented for this demo.", "صور المنتجات مولدة بالذكاء الاصطناعي، وكل العلامات التجارية مخترعة لهذا العرض التجريبي.") },
    ],
  },
};
