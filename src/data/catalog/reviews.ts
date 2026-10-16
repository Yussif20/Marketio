import type { Category } from "@/types/product";
import type { Text } from "./define";

/** Invented reviewer names; none refer to real people. */
export const reviewers = [
  "Layla H.", "Omar K.", "Sara M.", "Youssef A.", "Nour E.", "Hana S.", "Karim F.",
  "Mona R.", "Tarek B.", "Dina G.", "Ziad N.", "Reem T.", "Adam L.", "Maya C.",
  "Hassan W.", "Salma Y.", "Daniel P.", "Farah Q.", "Yara D.", "Ali Z.",
];

interface PoolEntry {
  body: Text;
  /** Star range this text fits, so a mixed review never shows five stars. */
  min: 1 | 2 | 3 | 4 | 5;
  max: 1 | 2 | 3 | 4 | 5;
}

const positive = (en: string, ar: string): PoolEntry => ({ body: [en, ar], min: 4, max: 5 });
const mixed = (en: string, ar: string): PoolEntry => ({ body: [en, ar], min: 3, max: 4 });

export const reviewPool: Record<Category | "general", PoolEntry[]> = {
  general: [
    positive("Arrived two days early and well packed. Exactly as described.", "وصل قبل موعده بيومين ومغلّف بعناية. مطابق تمامًا للوصف."),
    positive("Great value for the price. I'd buy it again.", "قيمة ممتازة مقابل السعر. سأشتريه مرة أخرى."),
    positive("Customer service answered my question within an hour. Very happy.", "خدمة العملاء ردّت على سؤالي خلال ساعة. سعيد جدًا."),
    mixed("Good overall, but the box was a bit dented on arrival.", "جيد بشكل عام، لكن العلبة وصلت مضغوطة قليلًا."),
    positive("Bought it as a gift and they loved it.", "اشتريته هدية وأعجب صاحبه كثيرًا."),
  ],
  phones: [
    positive("Battery easily lasts a full day of heavy use.", "البطارية تكفي يومًا كاملًا من الاستخدام المكثف بسهولة."),
    positive("The camera is excellent in daylight and decent at night.", "الكاميرا ممتازة في النهار وجيدة في الإضاءة المنخفضة."),
    mixed("Fast and smooth, though it gets warm while gaming.", "سريع وسلس، لكنه يسخن قليلًا أثناء الألعاب."),
    positive("Screen is bright enough to read outside in the sun.", "الشاشة ساطعة بما يكفي للقراءة تحت الشمس."),
  ],
  laptops: [
    positive("Light enough to carry all day and the keyboard is a joy.", "خفيف بما يكفي لحمله طوال اليوم ولوحة المفاتيح رائعة."),
    positive("Boots in seconds and handles my design work without lag.", "يعمل خلال ثوانٍ ويتعامل مع أعمال التصميم بلا تأخير."),
    mixed("Great performance; the fans can get loud under load.", "أداء رائع، لكن المراوح يعلو صوتها تحت الضغط."),
    positive("Battery got me through a full workday on one charge.", "البطارية كفتني يوم عمل كاملًا بشحنة واحدة."),
  ],
  cameras: [
    positive("Autofocus is quick and the colours look natural.", "التركيز التلقائي سريع والألوان طبيعية."),
    positive("Perfect for my travel vlogs, small and steady.", "مثالية لفلوجات السفر، صغيرة وثابتة."),
    mixed("Image quality is great; the menu takes time to learn.", "جودة الصورة رائعة، لكن القائمة تحتاج وقتًا للتعلّم."),
  ],
  monitors: [
    positive("Sharp text and accurate colours straight out of the box.", "نص حاد وألوان دقيقة من أول تشغيل."),
    positive("The stand adjusts easily and my neck thanks me.", "الحامل سهل التعديل ورقبتي ممتنة."),
    mixed("Lovely panel, but the built-in speakers are weak.", "الشاشة جميلة، لكن السماعات المدمجة ضعيفة."),
  ],
  clothing: [
    positive("Fabric feels soft and it kept its shape after washing.", "القماش ناعم وحافظ على شكله بعد الغسيل."),
    positive("True to size. I ordered my usual and it fits perfectly.", "المقاس مضبوط. طلبت مقاسي المعتاد وجاء مناسبًا تمامًا."),
    mixed("Nice quality, but the colour is slightly darker than the photo.", "جودة جيدة، لكن اللون أغمق قليلًا من الصورة."),
  ],
  toys: [
    positive("My kids played with it all weekend. Sturdy and fun.", "لعب به أطفالي طوال عطلة الأسبوع. متين وممتع."),
    positive("Clear instructions and the pieces fit together well.", "التعليمات واضحة والقطع تتركب بسهولة."),
    mixed("Fun, but the batteries are not included.", "ممتعة، لكن البطاريات غير مرفقة."),
  ],
  accessories: [
    positive("Feels premium in hand and goes with everything.", "ملمسه فاخر ويتناسب مع كل شيء."),
    positive("Comfortable to wear for hours.", "مريح للاستخدام لساعات طويلة."),
    mixed("Looks great; the strap took a few days to soften.", "شكله رائع، لكن السوار احتاج أيامًا ليلين."),
  ],
};
