import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
 resources: {
  en: {
    translation: {
      topHeader: {
        text: "Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!",
        button: "Shop Now",
      },
      header: {
        logo: "MARKETIO",
        home: "Home",
        about: "About",
        contact: "Contact",
        signup: "Sign Up",
      },
      aside: {
        menFashion: "Men's Fashion",
        womenFashion: "Women's Fashion",
        electronics: "Electronics",
        homeAppliances: "Home Appliances",
        sportsOutdoors: "Sports & Outdoors",
        beautyAndPersonalCare: "Beauty & Personal Care",
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
    },
  },
  ar: {
    translation: {
      topHeader: {
        text: "!50% تخفيضات الصيف على جميع ملابس السباحة وتوصيل سريع مجاني - خصم",
        button: "تسوق الآن",
      },
      header: {
        logo: "ماركيتيو",
        home: "الصفحة الرئيسية",
        about: "عنا",
        contact: "اتصل بنا",
        signup: "تسجيل الدخول",
      },
      aside: {
        menFashion: "أزياء الرجال",
        womenFashion: "أزياء النساء",
        electronics: "الإلكترونيات",
        homeAppliances: "الأجهزة المنزلية",
        sportsOutdoors: "الرياضة والأنشطة الخارجية",
        beautyAndPersonalCare: "الجمال والعناية الشخصية",
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
    },
  },
  es: {
    translation: {
      topHeader: {
        text: "¡Venta de verano para todos los trajes de baño y entrega exprés gratuita - 50% de descuento!",
        button: "Comprar ahora",
      },
      header: {
        logo: "MARKETIO",
        home: "Página principal",
        about: "Acerca de",
        contact: "Contacto",
        signup: "Regístrate",
      },
      aside: {
        menFashion: "Moda para hombres",
        womenFashion: "Moda para mujeres",
        electronics: "Electrónica",
        homeAppliances: "Electrodomésticos",
        sportsOutdoors: "Deportes y exteriores",
        beautyAndPersonalCare: "Belleza y cuidado personal",
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
    },
  },
},

  });

export default i18next;
