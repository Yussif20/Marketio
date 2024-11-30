import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../ProductContext';

const HeroSlider = () => {
  const { t } = useTranslation();
  const { direction } = useProductContext();

  const heroData = t('hero.data', { returnObjects: true });

  return (
    <div
      className={`flex justify-center items-center my-12 ${
        direction === 'rtl' ? 'rtl-class' : ''
      } max-w-[320px] sm:max-w-[550px] lg:max-w-[900px]`}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        allowTouchMove={true}
        dir={!direction ? 'rtl' : 'ltr'}
        key={direction}
        className="w-full max-w-3xl"
      >
        {heroData.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                className="w-full max-h-[350px] object-cover"
                src={product.image}
                alt={product.title}
              />
              <div
                className={`absolute z-10 text-white top-20 ${
                  direction === 'rtl'
                    ? 'right-8 sm:right-16'
                    : 'left-8 sm:left-16'
                }`}
              >
                <h3>{product.title}</h3>
                <p className="text-2xl sm:text-5xl font-semibold md:my-4">
                  {t('hero.title')}
                  <br />
                  {t('hero.titleSecondLine')}
                </p>
                <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                  {t('hero.button')}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
