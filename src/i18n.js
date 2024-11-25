import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { heroSliderDataEn,heroSliderDataAr,heroSliderDataEs } from "./data";

const optionsEn = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'es', label: 'Spanish' },
];
const optionsAr = [
  { value: 'en', label: "الانجليزية" },
  { value: 'ar', label: "العربية" },
  { value: 'es', label: 'الاسبانية' },
];
const optionsEs = [
  { value: 'en', label: 'Inglés' }, 
  { value: 'ar', label: 'Árabe' },  
  { value: 'es', label: 'Español' } 
];


i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
 resources: {
  en: {
    translation: {
      languageOptions:optionsEn,
      topHeader: {
        text: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
        button: "Shop Now",
      },
      header: {
        logoFirst: "MAR",
        logoColored:"KET",
        logoSecond: "IO",
        home: "Home",
        about: "About",
        contact: "Contact",
        signup: "Sign Up",
        searchPlaceHolder:"What are you looking for"
      },
      aside: {
        menFashion: "Men's Fashion",
        shirts:"Shirts",
        jeans:"Jeans",
        womenFashion: "Women's Fashion",
        electronics: "Electronics",
        homeAppliances: "Home Appliances",
        sportsOutdoors: "Sports & Outdoors",
        beautyAndPersonalCare: "Beauty & Personal Care",
      },
      hero:{
        title:"Up to 10%",
        titleSecondLine:" off Voucher",
        button:"Shop Now",
        data:heroSliderDataEn,
      },
      sections: {
        flashSales: {
          headline: "Today's",
          title: "Flash Sales",
        },
        categories: {
          headline: "Categories",
          title: "Browse By Category",
        },
        bestSelling: {
          headline: "This Month",
          title: "Best Selling Products",
        },
        explore: {
          headline: "Our Products",
          title: "Explore Our Products",
        },
        featured: {
          headline: "Featured",
          title: "New Arrival",
        },
      },
       footer: {
          subscribe: {
            title:"Subscribe",
            headline: "Exclusive",
            text: "Get 10% off your first order",
            placeholder: "Enter Your Email",
          },
           support: {
            headline: "Support",
          },
          account: {
            headline: "Account",
            links: ["My Account", "Register", "Wishlist", "Log In"],
          },
          quickLinks: {
            headline: "Quick Links",
            links: ["Privacy Policy", "Terms of Use", "FAQs", "Contact"],
          },
          downloadApp: {
            headline: "Download App",
            text: "Save $3 with App New User Only",
          },
        },
        guarantees: {
          freeDelivery: "Free and Fast Delivery",
          customerService: "24/7 Customer Service",
          moneyBack: "Money Back Guarantee",
        },
        pages:{
         contact: {
          title: "Contact",
          breadcrumbs: {
            home: "Home",
            contact: "Contact",
          },
          callToUs: {
            phone: {
              title: "Call To Us",
              description: "We are available 24/7, 7 days a week.",
              phoneNumber: "Phone: +8801611122222",
            },
            email: {
              title: "Email Us",
              description: "We are available 24/7, 7 days a week.",
              email: "email: marketio@gmail.com",
            },
          },
          form: {
            namePlaceholder: "Your Name",
            emailPlaceholder: "Your Email",
            phonePlaceholder: "Your Phone",
            messagePlaceholder: "Your Message",
            submitButton: "Send Message",
          },
        },
        }
    },
    meta: { dir: "ltr" },
  },
  ar: {
    translation: {
       languageOptions:optionsAr,
      topHeader: {
        text: "!50% تخفيضات الصيف على جميع ملابس السباحة وتوصيل سريع مجاني - خصم",
        button: "تسوق الآن",
      },
      header: {
        logoFirst: "مار",
        logoColored:"كيت",
        logoSecond: "يو",
        home: "الصفحة الرئيسية",
        about: "عنا",
        contact: "اتصل بنا",
        signup: "تسجيل الدخول",
        searchPlaceHolder:"ماذا تبحث عن؟",
      },
      aside: {
        menFashion: "أزياء الرجال",
        shirts:"تيشرتات",
        jeans:"جينز",
        womenFashion: "أزياء النساء",
        electronics: "الإلكترونيات",
        homeAppliances: "الأجهزة المنزلية",
        sportsOutdoors: "الرياضة والأنشطة الخارجية",
        beautyAndPersonalCare: "الجمال والعناية الشخصية",
      },
      hero: {
        title:"تخفيضات على القسم الفرعي",
        titleSecondLine:"10% حتى",
        button:"تسوق الآن",
        data:heroSliderDataAr,
      },
      sections: {
        flashSales: {
          headline: "اليوم",
          title: "التخفيضات السريعة",
        },
        categories: {
          headline: "الفئات",
          title: "تصفح حسب الفئة",
        },
        bestSelling: {
          headline: "هذا الشهر",
          title: "المنتجات الأكثر مبيعاً",
        },
        explore: {
          headline: "منتجاتنا",
          title: "استكشف منتجاتنا",
        },
        featured: {
          headline: "المميز",
          title: "وصل حديثاً",
        },
      },
         footer: {
          subscribe: {
            title:"اشترك",
            headline: "حصري",
            text: "احصل على خصم 10٪ على أول طلب لك",
            placeholder: "أدخل بريدك الإلكتروني",
          },
          support: {
            headline: "الدعم",
 
          },
          account: {
            headline: "الحساب",
            links: ["حسابي", "تسجيل", "قائمة الأمنيات", "تسجيل الدخول"],
          },
          quickLinks: {
            headline: "روابط سريعة",
            links: ["سياسة الخصوصية", "شروط الاستخدام", "الأسئلة الشائعة", "اتصل"],
          },
          downloadApp: {
            headline: "حمل التطبيق",
            text: "وفر 3 دولارات مع التطبيق فقط للمستخدمين الجدد",
          },
        },
        guarantees: {
          freeDelivery: "توصيل مجاني وسريع",
          customerService: "خدمة عملاء 24/7",
          moneyBack: "ضمان استرداد الأموال",
        },
        pages:{
            contact: {
          title: "اتصل",
          breadcrumbs: {
            home: "الصفحة الرئيسية",
            contact: "اتصل بنا",
          },
          callToUs: {
            phone: {
              title: "اتصل بنا",
              description: "نحن متاحون على مدار 24 ساعة طوال أيام الأسبوع.",
              phoneNumber: "الهاتف: +8801611122222",
            },
            email: {
              title: "راسلنا عبر البريد الإلكتروني",
              description: "نحن متاحون على مدار 24 ساعة طوال أيام الأسبوع.",
              email: "الايميل: Marketio@gmail.com",
            },
          },
          form: {
            namePlaceholder: "اسمك",
            emailPlaceholder: "بريدك الإلكتروني",
            phonePlaceholder: "رقم هاتفك",
            messagePlaceholder: "رسالتك",
            submitButton: "إرسال رسالة",
          },
        },
        }
    },
    meta: { dir: "rtl" },
  },
  es: {
    translation: {
       languageOptions:optionsEs,
      topHeader: {
        text: "¡Venta de verano para todos los trajes de baño y entrega exprés gratuita - 50% de descuento!",
        button: "Comprar ahora",
      },
      header: {
       logoFirst: "MAR",
       logoColored:"KET",
       logoSecond: "IO",
        home: "Página principal",
        about: "Acerca de",
        contact: "Contacto",
        signup: "Regístrate",
        searchPlaceHolder:"¿Qué estás buscando?"
      },
      aside: {
        menFashion: "Moda para hombres",
        shirts:"Chaquetas",
        jeans:"Pantalones",
        womenFashion: "Moda para mujeres",
        electronics: "Electrónica",
        homeAppliances: "Electrodomésticos",
        sportsOutdoors: "Deportes y exteriores",
        beautyAndPersonalCare: "Belleza y cuidado personal",
      },
      hero:{
        title:"Hasta 50% de descuento!",
        titleSecondLine:"en la oferta especial",
        button:"Comprar ahora",
        data:heroSliderDataEs,
      },
      sections: {
        flashSales: {
          headline: "De hoy",
          title: "Ventas Flash",
        },
        categories: {
          headline: "Categorías",
          title: "Explorar por categoría",
        },
        bestSelling: {
          headline: "Este mes",
          title: "Productos más vendidos",
        },
        explore: {
          headline: "Nuestros productos",
          title: "Explora nuestros productos",
        },
        featured: {
          headline: "Destacado",
          title: "Nuevas llegadas",
        },
      },
        footer: {
          subscribe: {
            title:"Suscribirse",
            headline: "Exclusivo",
            text: "Obtén un 10% de descuento en tu primer pedido",
            placeholder: "Introduce tu correo electrónico",
          },
          support: {
            headline: "Soporte",

          },
          account: {
            headline: "Cuenta",
            links: ["Mi cuenta", "Registrarse", "Lista de deseos", "Iniciar sesión"],
          },
          quickLinks: {
            headline: "Enlaces rápidos",
            links: ["Política de privacidad", "Términos de uso", "Preguntas frecuentes", "Contacto"],
          },
          downloadApp: {
            headline: "Descargar App",
            text: "Ahorra $3 solo con la nueva aplicación para usuarios",
          },
        },
        guarantees: {
          freeDelivery: "Entrega gratuita y rápida",
          customerService: "Servicio al cliente 24/7",
          moneyBack: "Garantía de devolución de dinero",
        },
        pages:{
           contact: {
          title: "Contacto",
          breadcrumbs: {
            home: "Inicio",
            contact: "Contacto",
          },
          callToUs: {
            phone: {
              title: "Llámanos",
              description: "Estamos disponibles 24/7, los 7 días de la semana.",
              phoneNumber: "Teléfono: +8801611122222",
            },
            email: {
              title: "Envíanos un correo",
              description: "Estamos disponibles 24/7, los 7 días de la semana.",
              email: "email: Marketio@gmail.com",
            },
          },
          form: {
            namePlaceholder: "Tu Nombre",
            emailPlaceholder: "Tu Correo Electrónico",
            phonePlaceholder: "Tu Teléfono",
            messagePlaceholder: "Tu Mensaje",
            submitButton: "Enviar Mensaje",
          },
        },
        }
    },
    meta: { dir: "ltr" },
  },
},

  });

export default i18next;

