import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { heroSliderDataEn,heroSliderDataAr,heroSliderDataEs,categoriesEn,categoriesAr,categoriesEs} from "./data";

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

const asideEn = [
        {
         title: "Cameras",
          value: "cameras",
        },
         {
          title: "Phones",
          value: "phones",
        },
         {
          title: "Laptops",
          value: "laptops",
        },
         {
          title: "Clothing",
          value: "clothing",
        },
         {
          title: "Monitors",
          value: "monitors",
        },
         {
          title: "Toys",
          value: "toys",
        },
         {
          title: "Accessories",
          value: "accessories",
        },
]
const asideAr = [
    {
        title: "كاميرات",
        value: "cameras",
    },
    {
        title: "هواتف",
        value: "phones",
    },
    {
        title: "أجهزة لابتوب",
        value: "laptops",
    },
    {
        title: "ملابس",
        value: "clothing",
    },
    {
        title: "شاشات",
        value: "monitors",
    },
    {
        title: "ألعاب",
        value: "toys",
    },
    {
        title: "إكسسوارات",
        value: "accessories",
    },
];
const asideEs = [
    {
        title: "Cámara",
        value: "cameras",
    },
    {
        title: "Teléfonos",
        value: "phones",
    },
    {
        title: "Portátiles",
        value: "laptops",
    },
    {
        title: "Ropa",
        value: "clothing",
    },
    {
        title: "Monitores",
        value: "monitors",
    },
    {
        title: "Juguetes",
        value: "toys",
    },
    {
        title: "Accesorios",
        value: "accessories",
    },
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
        searchPlaceHolder:"What are you looking for",
        accountMenu:{
          join: "Join Us",
          welcome: "Welcome",
          logOut:"Log out",
        },
      },
      aside: asideEn,
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
          data:categoriesEn,
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
          playstation:{
            title: "PlayStation 5",
            description: "Experience the ultimate gaming experience with our PlayStation 5.",
          },
          womenCollection:{
            title: "Women's Collection",
            description: "Featured woman collections that give you another vibe.",
          },
          speakers:{
            title: "Speakers",
            description: "Experience the ultimate sound quality with our speakers.",
          },
          perfume:{
            title: "Perfume",
            description: "Experience the ultimate essence with our perfume.",
          }
        },
        saleCount: {
          title: "categories",
          text: "Enhance Your",
          textSecondLine: "Music Experience",
        },
      },
      buttons:{
        viewAll: "View All",
        buyNow: "Buy Now!",
        shopNow:"Shop Now",
        continue:"Continue Shopping",
        createAccount: "Create Account",
        googleSign:" Sign up with Google",
        logIn: "Log In",
        forgetPassword: "Forget Password",
        moveAllToBag: "Move All to Bag",
        seeAll: "See All",
        applyCoupon: "Apply Coupon",
        proceedToCheckout:"Proceed To Checkout",
        placeOrder:"Place Order",
        addToCart:"Add To Cart",
        goToHomePage:"Go to Homepage",
        saveRating:"Save Rating",
      },
      footer: {
          subscribe: {
            title:"Subscribe",
            headline: "Marketio",
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
      services: {
          freeDelivery:{
            title: "Free and Fast Delivery",
            description: "Free delivery for all orders over $140.",
          },
          customerService: {
            title: "Customer Service",
            description: "Friendly 24/7 customer support.",
          },
          moneyBack:{
            title: "Money Back Guarantee",
            description: "We reurn money within 30 days.",
          },
        },
      countdown:{
        days:"days",
        hours:"hours",
        minutes:"minutes",
        seconds:"seconds",
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
         about:{
          title:"About Us",
          breadcrumbs: {
            home: "Home",
            about: "About",
          },
          textFirst:`Launced in 2015, Marketio is South Asia’s  premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Marketio
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.`,
          textSecond:`Marketio has more than 1 Million products to offer, growing at a very fast. Marketio offers a diverse assotment in categories ranging from consumer.`
          ,statics:{
            support:{
              number:"10.5k",
              text:"Friendly 24/7 customer support"
            },
            sales:{
              number:"33k",
              text:"Monthly Product Sale"
            },  
            customers:{
              number:"45.5k",
              text:"Customer active in our site"
            },   
            gross:{
              number:"25k",
              text:"Annual Gross"
            },
          },
    
        },
        sign:{
          signedIn:{
            welcome:"Welcome",
            text:"You are already signed in!"
          },
          signUp:{  
            title:"Create an account",
            text:"Enter your details below",
            haveAccount:"Already have an account?",
            logIn:"Log in",
          },
          login:{
            title:"Log in to",
            text:"Enter your details below",
            haveAccount:"Don't have an account?",
            signUp:"Sign up",
          },
          inputPlaceholder:{
            email:"Email",
            password:"Password",
          },
        },
        cart:{
          emptyText:"There are no Items in your cart!",
          breadcrumbs: {
            home: "Home",
            cart: "Cart",
          },
          tags:{
            product: "Product",
            price: "Price",
            quantity:"Quantity",
            total:"Total",
          },
          cartTotal:{
            title:"Cart Total",
            subTotal:"SubTotal",
            shipping:"Shipping",
            total:"Total",
          },
          couponCode:"Coupon Code",
        },
        checkout:{
          breadcrumbs: {
            home: "Home",
            cart: "Cart",
            checkout: "Checkout",
          },
          billingDetails:{
            title:"Billing Details",
            name:"First Name",
            phone:"Phone Number",
            address:"Address",
            email:"Email",
          },
          paymentMethod:{
            title:"Payment Method",
            cashOnDelivery :"Cash On Delivery",
            bank :"Bank",
            cardText:"Enter Card Details"
          }

        },
        wishlist:{
          title:"Wishlist",
          emptyText:"No items in your favorite list.",justForYou:"Just for you"
        },
        productDetails:{
          loading:"Loading...",
          home:"Home",
          freeDelivery:{
            title:"Free Delivery",
            text:" Enter your postal code for Delivery Availability"
          },
          return:{
            title:"Return Delivery",
            text:"Free 30 Days Delivery Returns. Details"
          }
        },
        searchResult:{
          title:"Search Result",
          headline:"The result of",
          emptyText:"The searched products aren't Found",
        },
        categoriesPage:{
          title:"Categories",
          headline:"You are now browsing the",
          emptyText:"Sadly There are no items available in this category"
        },
        successPage:{
            title:"Thank You for Your Purchase!",
            text:"Your order has been successfully placed."
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
        accountMenu: {
          join: "انضم إلينا",
          welcome: "مرحبًا",
          logOut: "تسجيل الخروج",
        },
      },
      aside: asideAr,
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
          data:categoriesAr,
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
          title: "وصول جديد",
          playstation: {
            title: "بلايستيشن 5",
            description: "اختبر تجربة اللعب النهائية مع بلايستيشن 5 الخاص بنا.",
          },
          womenCollection: {
            title: "مجموعة النساء",
            description: "مجموعات نسائية مميزة تمنحك أجواء مختلفة.",
          },
          speakers: {
            title: "مكبرات الصوت",
            description: "اختبر جودة الصوت المثلى مع مكبرات الصوت الخاصة بنا.",
          },
          perfume: {
            title: "عطور",
            description: "استمتع بأروع الروائح مع عطورنا المميزة.",
          },
        },

        saleCount: {
            title: "الفئات",
            text: "عزز",
            textSecondLine: "تجربة الموسيقى الخاصة بك",
},
      },
      buttons:{
        viewAll: "أظهر كل المنتجات",
        buyNow:"اشترى الان !",
        shopNow: "تسوق الآن",
        continue: "متابعة التسوق",
        createAccount: "إنشاء حساب",
        googleSign: "سجل باستخدام جوجل",
        logIn: "تسجيل الدخول",
        forgetPassword: "نسيت كلمة المرور",
        moveAllToBag: "نقل الكل إلى السلة",
        seeAll: "عرض الكل",
        applyCoupon: "تطبيق القسيمة",
        proceedToCheckout: "المتابعة إلى الدفع",
        placeOrder: "تقديم الطلب",
        addToCart: "أضف إلى السلة",
        goToHomePage: "العودة إلى الصفحة الرئيسية",
        saveRating: "حفظ التقييم",
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
      services: {
        freeDelivery: {
    title: "توصيل مجاني وسريع",
    description: "توصيل مجاني لجميع الطلبات التي تزيد عن 140 دولارًا",
        },
        customerService: {
          title: "خدمة العملاء",
          description: ".دعم عملاء ودود على مدار الساعة",
        },
        moneyBack: {
          title: "ضمان استرداد الأموال",
          description: ".نسترد الأموال خلال 30 يومًا",
        },
      },
      countdown: {
        days: "أيام",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثوانٍ",
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
          about: {
          title: "من نحن",
          breadcrumbs: {
            home: "الرئيسية",
            about: "من نحن",
          },
          textFirst: `تم إطلاق ماركيتيو في عام 2015، وهي السوق الإلكترونية الرائدة في جنوب آسيا بحضور نشط في بنغلاديش. بدعم من مجموعة واسعة من الحلول التسويقية والبيانية والخدمية المخصصة، تمتلك ماركيتيو 10,500 بائع و300 علامة تجارية وتخدم 3 ملايين عميل في جميع أنحاء المنطقة.`,
          textSecond: `تقدم ماركيتيو أكثر من مليون منتج، وتنمو بمعدل سريع. تقدم ماركيتيو مجموعة متنوعة من الفئات التي تتراوح بين المنتجات الاستهلاكية.`,
          statics: {
            support: {
              number: "10.5k",
              text: "دعم عملاء ودود على مدار الساعة"
            },
            sales: {
              number: "33k",
              text: "مبيعات شهرية للمنتجات"
            },
            customers: {
              number: "45.5k",
              text: "عملاء نشطون على موقعنا"
            },
            gross: {
              number: "25k",
              text: "الإجمالي السنوي"
            },
          },
  
        },
          sign: {
              signedIn: {
                welcome: "مرحبًا",
                text: "لقد قمت بتسجيل الدخول بالفعل!",
              },
              signUp: {  
                title: "إنشاء حساب",
                text: "أدخل بياناتك أدناه",
                haveAccount: "هل لديك حساب بالفعل؟",
                logIn: "تسجيل الدخول",
              },
              login: {
                title: "تسجيل الدخول إلى",
                text: "أدخل بياناتك أدناه",
                haveAccount: "لا تملك حسابًا؟",
                signUp: "إنشاء حساب",
              },
              inputPlaceholder: {
                email: "البريد الإلكتروني",
                password: "كلمة المرور",
              },
        },
          cart: {
          emptyText: "لا توجد عناصر في سلة التسوق!",
          breadcrumbs: {
            home: "الرئيسية",
            cart: "السلة",
          },
          tags: {
            product: "المنتج",
            price: "السعر",
            quantity: "الكمية",
            total: "الإجمالي",
          },
          cartTotal: {
            title: "إجمالي السلة",
            subTotal: "الإجمالي الفرعي",
            shipping: "الشحن",
            total: "الإجمالي",
          },
          couponCode: "رمز القسيمة",
        },
        checkout: {
          breadcrumbs: {
            home: "الرئيسية",
            cart: "السلة",
            checkout: "الدفع",
          },
          billingDetails: {
            title: "تفاصيل الفاتورة",
            name: "الاسم الأول",
            phone: "رقم الهاتف",
            address: "العنوان",
            email: "البريد الإلكتروني",
          },
          paymentMethod: {
            title: "طريقة الدفع",
            cashOnDelivery: "الدفع عند الاستلام",
            bank: "البنك",
            cardText: "أدخل تفاصيل البطاقة",
          },
        },
        wishlist: {
          title: "المفضلة",
          emptyText: "لا توجد عناصر في قائمة المفضلات.",
          justForYou: "مختارة لك",
        },
        productDetails: {
          loading: "جارٍ التحميل...",
          home: "الرئيسية",
          freeDelivery: {
            title: "توصيل مجاني",
            text: "أدخل الرمز البريدي للتحقق من توفر التوصيل",
          },
          return: {
            title: "إرجاع مجاني",
            text: "إرجاع مجاني خلال 30 يومًا. التفاصيل",
          },
        },
        searchResult: {
          title: "نتائج البحث",
          headline: "نتيجة البحث عن",
          emptyText: "لم يتم العثور على المنتجات المطلوبة",
        },
        categoriesPage: {
          title: "الفئات",
          headline: "أنت الآن تتصفح",
          emptyText: "للأسف، لا توجد عناصر متاحة في هذه الفئة",
        },
        successPage: {
          title: "شكرًا لك على شرائك!",
          text: "تم تقديم طلبك بنجاح.",
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
        searchPlaceHolder:"¿Qué estás buscando?",
        accountMenu: {
        join: "Únete a nosotros",
        welcome: "Bienvenido",
        logOut: "Cerrar sesión",
      },
      },
      aside: asideEs,
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
          data:categoriesEs,
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
          title: "Nueva llegada",
          playstation: {
            title: "PlayStation 5",
            description: "Vive la experiencia de juego definitiva con nuestra PlayStation 5.",
          },
          womenCollection: {
            title: "Colección para mujeres",
            description: "Colecciones destacadas para mujeres que te dan otra vibra.",
          },
          speakers: {
            title: "Altavoces",
            description: "Experimenta la mejor calidad de sonido con nuestros altavoces.",
          },
          perfume: {
            title: "Perfume",
            description: "Experimenta la esencia definitiva con nuestro perfume.",
          },
        },
        saleCount: {
          title: "categorías",
          text: "Mejora tu",
          textSecondLine: "experiencia musical",
        },
      },
      buttons:{
        viewAll:"Ver todo",
        buyNow: "Comprar ahora!",
        shopNow: "Comprar ahora",
        continue: "Seguir Comprando",
        createAccount: "Crear Cuenta",
        googleSign: "Regístrate con Google",
        logIn: "Iniciar Sesión",
        forgetPassword: "Olvidé mi Contraseña",
        moveAllToBag: "Mover todo a la bolsa",
        seeAll: "Ver todo",
        applyCoupon: "Aplicar cupón",
        proceedToCheckout: "Proceder al pago",
        placeOrder: "Realizar pedido",
        addToCart: "Añadir al carrito",
        goToHomePage: "Ir a la página principal",
        saveRating: "Guardar calificación",
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
      services: {
        freeDelivery: {
          title: "Entrega rápida y gratuita",
          description: "Entrega gratuita para todos los pedidos superiores a $140.",
        },
        customerService: {
          title: "Atención al cliente",
          description: "Soporte al cliente amigable las 24/7.",
        },
        moneyBack: {
          title: "Garantía de devolución de dinero",
          description: "Devolvemos el dinero dentro de los 30 días.",
        },
      },
      countdown: {
        days: "días",
        hours: "horas",
        minutes: "minutos",
        seconds: "segundos",
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
              email: "correo electrónico: Marketio@gmail.com",
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
       about: {
          title: "Sobre Nosotros",
          breadcrumbs: {
            home: "Inicio",
            about: "Sobre Nosotros",
          },
          textFirst: `Lanzado en 2015, Marketio es el principal mercado de compras en línea del sur de Asia con una presencia activa en Bangladesh. Con el apoyo de una amplia gama de soluciones de marketing, datos y servicios personalizados, Marketio cuenta con 10,500 vendedores y 300 marcas y atiende a 3 millones de clientes en toda la región.`,
          textSecond: `Marketio ofrece más de 1 millón de productos y está creciendo a un ritmo muy rápido. Marketio ofrece una variedad diversa en categorías que van desde productos de consumo.`,
          statics: {
            support: {
              number: "10.5k",
              text: "Atención al cliente amigable 24/7"
            },
            sales: {
              number: "33k",
              text: "Ventas mensuales de productos"
            },
            customers: {
              number: "45.5k",
              text: "Clientes activos en nuestro sitio"
            },
            gross: {
              number: "25k",
              text: "Ingresos anuales brutos"
            },
          },
   
        },
        sign: {
          signedIn: {
            welcome: "Bienvenido",
            text: "¡Ya has iniciado sesión!",
          },
          signUp: {  
            title: "Crear una cuenta",
            text: "Ingresa tus datos a continuación",
            haveAccount: "¿Ya tienes una cuenta?",
            logIn: "Iniciar sesión",
          },
          login: {
            title: "Inicia sesión en",
            text: "Ingresa tus datos a continuación",
            haveAccount: "¿No tienes una cuenta?",
            signUp: "Regístrate",
          },
          inputPlaceholder: {
            email: "Correo electrónico",
            password: "Contraseña",
          },
        },
        cart: {
          emptyText: "¡No hay artículos en tu carrito!",
          breadcrumbs: {
            home: "Inicio",
            cart: "Carrito",
          },
          tags: {
            product: "Producto",
            price: "Precio",
            quantity: "Cantidad",
            total: "Total",
          },
          cartTotal: {
            title: "Total del carrito",
            subTotal: "Subtotal",
            shipping: "Envío",
            total: "Total",
          },
          couponCode: "Código de cupón",
        },
        checkout: {
          breadcrumbs: {
            home: "Inicio",
            cart: "Carrito",
            checkout: "Pagar",
          },
          billingDetails: {
            title: "Detalles de Facturación",
            name: "Nombre",
            phone: "Número de Teléfono",
            address: "Dirección",
            email: "Correo Electrónico",
          },
          paymentMethod: {
            title: "Método de Pago",
            cashOnDelivery: "Pago Contra Entrega",
            bank: "Banco",
            cardText: "Ingrese los Detalles de la Tarjeta",
          },
        },
        wishlist: {
          title: "Lista de deseos",
          emptyText: "No hay artículos en tu lista de favoritos.",
          justForYou: "Solo para ti",
        },
        productDetails: {
          loading: "Cargando...",
          home: "Inicio",
          freeDelivery: {
            title: "Entrega gratuita",
            text: "Introduce tu código postal para verificar la disponibilidad de la entrega",
          },
          return: {
            title: "Devolución gratuita",
            text: "Devoluciones gratuitas durante 30 días. Detalles",
          },
        },
        searchResult: {
          title: "Resultado de la búsqueda",
          headline: "El resultado de",
          emptyText: "No se encontraron los productos buscados",
        },
        categoriesPage: {
          title: "Categorías",
          headline: "Ahora estás navegando por",
          emptyText: "Lamentablemente, no hay artículos disponibles en esta categoría",
        },
        successPage: {
          title: "¡Gracias por tu compra!",
          text: "Tu pedido se ha realizado con éxito.",
        },

      }
    },
    meta: { dir: "ltr" },
  },
},

  });

export default i18next;

