import type { LocalizedText } from "@/types/product";

export interface JournalPost {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  cover: string;
  /** ISO 8601 date. */
  date: string;
  readingMinutes: number;
  sections: Array<{ heading: LocalizedText; body: LocalizedText }>;
  /** Products linked at the end of the article. */
  products: string[];
}

const t = (en: string, ar: string): LocalizedText => ({ en, ar });

/** Short buying guides for the demo journal. Written for this store; no external sources. */
export const journalPosts: JournalPost[] = [
  {
    slug: "choose-headphones",
    title: t("How to choose headphones that suit the way you listen", "كيف تختار سماعات تناسب طريقة استماعك"),
    excerpt: t("Over-ear, earbuds or a speaker? A quick guide to noise cancelling, battery life and comfort.", "سماعات رأس أم سماعات أذن أم سماعة خارجية؟ دليل سريع عن إلغاء الضوضاء وعمر البطارية والراحة."),
    cover: "/journal/choose-headphones.webp",
    date: "2026-10-09",
    readingMinutes: 4,
    sections: [
      {
        heading: t("Start with where you listen", "ابدأ بمكان الاستماع"),
        body: t(
          "Commuters and frequent flyers get the most from over-ear headphones with active noise cancelling. If you listen at the gym or on runs, light earbuds with a secure fit and sweat resistance make more sense.",
          "يستفيد من يتنقلون يوميًا أو يسافرون كثيرًا من سماعات الرأس ذات إلغاء الضوضاء النشط. أما إذا كنت تستمع في النادي أو أثناء الجري، فسماعات الأذن الخفيفة المقاومة للعرق خيار أفضل.",
        ),
      },
      {
        heading: t("Noise cancelling, explained", "ما هو إلغاء الضوضاء؟"),
        body: t(
          "Microphones listen to the noise around you and play the opposite signal to cancel it. It works best on steady sounds like engines and air conditioning, so you can listen at a lower, safer volume.",
          "تلتقط الميكروفونات الضوضاء من حولك وتشغّل إشارة معاكسة لإلغائها. تعمل هذه الخاصية بشكل أفضل مع الأصوات الثابتة مثل المحركات والمكيفات، فتستمع بصوت أخفض وأكثر أمانًا.",
        ),
      },
      {
        heading: t("Battery life and comfort", "عمر البطارية والراحة"),
        body: t(
          "Look for at least 30 hours on over-ear models and 6 hours per charge on earbuds. Comfort matters more than specs: soft ear cushions and a light headband make a long flight bearable.",
          "ابحث عن 30 ساعة على الأقل في سماعات الرأس و6 ساعات لكل شحنة في سماعات الأذن. الراحة أهم من المواصفات: وسائد ناعمة وطوق خفيف يجعلان الرحلة الطويلة محتملة.",
        ),
      },
    ],
    products: ["aurora-wireless-headphones", "aurora-buds-pro", "aurora-mini-speaker"],
  },
  {
    slug: "laptop-buying-guide",
    title: t("Laptop buying guide: what really matters in 2026", "دليل شراء اللابتوب: ما الذي يهم فعلًا في 2026"),
    excerpt: t("Memory, storage, screen and battery: how to pick the right laptop for study, work or play.", "الذاكرة والسعة والشاشة والبطارية: كيف تختار اللابتوب المناسب للدراسة أو العمل أو اللعب."),
    cover: "/journal/laptop-buying-guide.webp",
    date: "2026-09-28",
    readingMinutes: 5,
    sections: [
      {
        heading: t("Memory first", "الذاكرة أولًا"),
        body: t(
          "16 GB of RAM is the comfortable minimum for most people today. Designers, video editors and gamers should aim for 32 GB so many apps and browser tabs stay fast.",
          "ذاكرة 16 جيجابايت هي الحد الأدنى المريح لمعظم الناس اليوم. أما المصممون ومحررو الفيديو واللاعبون فالأفضل لهم 32 جيجابايت لتبقى التطبيقات والتبويبات سريعة.",
        ),
      },
      {
        heading: t("Choose the screen you'll look at all day", "اختر الشاشة التي ستنظر إليها طوال اليوم"),
        body: t(
          "A 14-inch screen balances portability and comfort. Higher refresh rates feel smoother, and a matte finish helps if you work near windows.",
          "الشاشة بقياس 14 بوصة توازن بين سهولة الحمل والراحة. معدلات التحديث الأعلى تبدو أكثر سلاسة، والسطح المطفي يساعد إذا كنت تعمل قرب النوافذ.",
        ),
      },
      {
        heading: t("Battery and ports", "البطارية والمنافذ"),
        body: t(
          "Check real-world battery figures, not just the headline number, and make sure you have USB-C charging plus the ports you use every day so you don't live on adapters.",
          "تحقق من أرقام البطارية الفعلية وليس الرقم المعلن فقط، وتأكد من وجود شحن USB-C والمنافذ التي تستخدمها يوميًا حتى لا تعيش على المحولات.",
        ),
      },
    ],
    products: ["atlas-14-laptop", "atlas-13-air-laptop", "vortex-gaming-laptop"],
  },
  {
    slug: "capsule-wardrobe",
    title: t("Build a capsule wardrobe with ten pieces", "ابنِ خزانة أساسية من عشر قطع"),
    excerpt: t("Fewer, better clothes that all work together: the essentials and how to combine them.", "ملابس أقل وأفضل تتناسق كلها معًا: الأساسيات وكيف تنسّقها."),
    cover: "/journal/capsule-wardrobe.webp",
    date: "2026-09-15",
    readingMinutes: 3,
    sections: [
      {
        heading: t("Pick a calm colour base", "اختر ألوانًا أساسية هادئة"),
        body: t(
          "Choose two neutrals, like navy and sand, and one accent colour. Every top should then work with every pair of trousers.",
          "اختر لونين محايدين مثل الكحلي والرملي ولونًا مميزًا واحدًا. بعدها يتناسق كل قميص مع كل بنطلون.",
        ),
      },
      {
        heading: t("The ten essentials", "القطع العشر الأساسية"),
        body: t(
          "Three t-shirts, a linen shirt, a knit sweater, a hoodie, chinos, jeans, a light jacket and one pair of clean white sneakers cover most days of the year.",
          "ثلاثة تيشيرتات وقميص كتان وكنزة صوف وهودي وبنطلون تشينو وجينز وجاكيت خفيف وحذاء رياضي أبيض واحد تكفي معظم أيام السنة.",
        ),
      },
    ],
    products: ["kora-essential-tee", "kora-linen-shirt", "kora-slim-chinos", "kora-runner-sneakers"],
  },
  {
    slug: "gifts-for-kids",
    title: t("Gifts for kids that keep them busy (and learning)", "هدايا للأطفال تشغلهم وتعلّمهم"),
    excerpt: t("Building kits, cuddly friends and family games picked by age.", "مجموعات بناء ودمى ناعمة وألعاب عائلية مختارة حسب العمر."),
    cover: "/journal/gifts-for-kids.webp",
    date: "2026-08-30",
    readingMinutes: 3,
    sections: [
      {
        heading: t("Under five", "أقل من خمس سنوات"),
        body: t(
          "Soft, washable plush toys and chunky bricks are safe, calming and great for little hands.",
          "الدمى المحشوة القابلة للغسل والمكعبات الكبيرة آمنة ومهدئة ورائعة للأيدي الصغيرة.",
        ),
      },
      {
        heading: t("Six to ten", "من ست إلى عشر سنوات"),
        body: t(
          "Robot kits introduce coding through play, and a kids' camera turns every walk into a photo project.",
          "مجموعات الروبوت تعرّف الأطفال على البرمجة باللعب، وكاميرا الأطفال تحوّل كل نزهة إلى مشروع تصوير.",
        ),
      },
      {
        heading: t("For the whole family", "لكل العائلة"),
        body: t(
          "A cooperative board game gets everyone around the table without anyone losing.",
          "اللعبة اللوحية التعاونية تجمع الكل حول الطاولة دون أن يخسر أحد.",
        ),
      },
    ],
    products: ["builder-robot-kit", "pixie-kids-camera", "cozy-plush-bear", "playlab-family-board-game"],
  },
  {
    slug: "home-office-setup",
    title: t("A home office setup that's kind to your back", "مكتب منزلي مريح لظهرك"),
    excerpt: t("Screen height, light and sound: simple changes for long working days.", "ارتفاع الشاشة والإضاءة والصوت: تغييرات بسيطة لأيام العمل الطويلة."),
    cover: "/journal/home-office-setup.webp",
    date: "2026-08-12",
    readingMinutes: 4,
    sections: [
      {
        heading: t("Raise your screen", "ارفع شاشتك"),
        body: t(
          "The top of your monitor should sit at eye level. A height-adjustable stand or an external monitor next to your laptop saves your neck.",
          "يجب أن تكون حافة الشاشة العليا بمستوى عينيك. الحامل القابل لتعديل الارتفاع أو الشاشة الخارجية بجانب اللابتوب يحميان رقبتك.",
        ),
      },
      {
        heading: t("One cable, tidy desk", "كابل واحد ومكتب مرتب"),
        body: t(
          "A USB-C monitor can charge your laptop and connect your keyboard through a single cable.",
          "شاشة USB-C تستطيع شحن اللابتوب وتوصيل لوحة المفاتيح عبر كابل واحد.",
        ),
      },
      {
        heading: t("Protect your focus", "احمِ تركيزك"),
        body: t(
          "Noise-cancelling headphones and blue-light glasses make long video-call days noticeably easier.",
          "سماعات إلغاء الضوضاء ونظارات الضوء الأزرق تجعل أيام مكالمات الفيديو الطويلة أسهل بشكل ملحوظ.",
        ),
      },
    ],
    products: ["clarity-27-usbc-monitor", "atlas-14-laptop", "halden-blue-light-glasses"],
  },
  {
    slug: "pack-light",
    title: t("How to pack light for a week away", "كيف تسافر بحقيبة خفيفة لمدة أسبوع"),
    excerpt: t("One backpack, a few smart layers and the right chargers.", "حقيبة ظهر واحدة وبعض الطبقات الذكية والشواحن المناسبة."),
    cover: "/journal/pack-light.webp",
    date: "2026-07-26",
    readingMinutes: 3,
    sections: [
      {
        heading: t("Layer, don't duplicate", "اعتمد على الطبقات بدل التكرار"),
        body: t(
          "A packable rain shell over a sweater handles most weather. Choose clothes that dry overnight.",
          "جاكيت مطر خفيف فوق كنزة يكفي لمعظم أحوال الطقس. اختر ملابس تجف خلال الليل.",
        ),
      },
      {
        heading: t("One charger for everything", "شاحن واحد لكل شيء"),
        body: t(
          "A small multi-port GaN charger and a magnetic power bank replace a tangle of cables.",
          "شاحن GaN صغير متعدد المنافذ وباور بانك مغناطيسي يغنيانك عن كومة الكابلات.",
        ),
      },
    ],
    products: ["voyager-laptop-backpack", "kora-rain-shell", "vela-65w-charger", "vela-magnetic-powerbank"],
  },
  {
    slug: "travel-photography",
    title: t("Travel photography basics with a small camera", "أساسيات تصوير السفر بكاميرا صغيرة"),
    excerpt: t("Golden hour, simple composition and the one lens worth packing.", "الساعة الذهبية والتكوين البسيط والعدسة الوحيدة التي تستحق الحمل."),
    cover: "/journal/travel-photography.webp",
    date: "2026-07-08",
    readingMinutes: 4,
    sections: [
      {
        heading: t("Shoot at golden hour", "صوّر في الساعة الذهبية"),
        body: t(
          "The hour after sunrise and before sunset gives soft, warm light that flatters every scene.",
          "الساعة التي تلي الشروق والتي تسبق الغروب تمنح ضوءًا دافئًا وناعمًا يجمّل كل مشهد.",
        ),
      },
      {
        heading: t("Keep composition simple", "اجعل التكوين بسيطًا"),
        body: t(
          "Place your subject off-centre, look for leading lines and leave space around it.",
          "ضع العنصر الرئيسي بعيدًا عن المنتصف، وابحث عن الخطوط التي تقود العين، واترك مساحة حوله.",
        ),
      },
      {
        heading: t("Pack one bright prime lens", "احمل عدسة ثابتة ساطعة واحدة"),
        body: t(
          "A 50 mm f/1.8 lens is light, sharp and great in low light for food, portraits and streets.",
          "عدسة 50 مم بفتحة f/1.8 خفيفة وحادة ورائعة في الإضاءة المنخفضة لتصوير الطعام والأشخاص والشوارع.",
        ),
      },
    ],
    products: ["lumen-pocket-camera", "orbit-mirrorless-camera", "lumen-50mm-lens"],
  },
  {
    slug: "choose-a-watch",
    title: t("Choosing a watch you'll wear every day", "اختيار ساعة سترتديها كل يوم"),
    excerpt: t("Minimal, chronograph, dive or smart: which style fits your days?", "بسيطة أم كرونوغراف أم غوص أم ذكية: أي نمط يناسب أيامك؟"),
    cover: "/journal/choose-a-watch.webp",
    date: "2026-06-20",
    readingMinutes: 3,
    sections: [
      {
        heading: t("Match the watch to your week", "اختر الساعة حسب أسبوعك"),
        body: t(
          "A minimal dial on leather suits the office and weddings; a dive watch handles beach weekends; a smartwatch tracks workouts and sleep.",
          "الميناء البسيط على سوار جلدي يناسب العمل والمناسبات، وساعة الغوص تتحمل عطلات البحر، والساعة الذكية تتابع التمارين والنوم.",
        ),
      },
      {
        heading: t("Size and comfort", "المقاس والراحة"),
        body: t(
          "Most wrists suit a 38–42 mm case. Quick-release straps let one watch change its look in seconds.",
          "معظم المعاصم تناسبها علبة بقياس 38–42 مم. الأساور سريعة التبديل تغيّر شكل الساعة في ثوانٍ.",
        ),
      },
    ],
    products: ["halden-minimal-watch", "meridian-chronograph-watch", "halden-smartwatch", "halden-dive-watch"],
  },
];
