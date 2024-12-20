import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import ProductCard from './ProductCard';
import { useProductContext } from '../ProductContext';
import { useTranslation } from 'react-i18next';

const ProductSlider = ({ spaceBetween }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { direction, products } = useProductContext();

  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';
  return (
    <div className="relative w-full my-12">
      <div
        className={`flex gap-2 absolute py-4 ${
          direction === 'ltr' ? 'right-8' : 'left-8'
        } top-[-40px] sm:top-[-70px]`}
      >
        <button
          ref={prevRef}
          className="text-darkPrimary dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <i
            className={`fa-solid ${
              direction === 'ltr' ? 'fa-arrow-left' : 'fa-arrow-right'
            }`}
          ></i>
        </button>
        <button
          ref={nextRef}
          className="text-darkPrimary dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <i
            className={`fa-solid ${
              direction === 'ltr' ? 'fa-arrow-right' : 'fa-arrow-left'
            }`}
          ></i>
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="grid grid-cols-3"
        dir={!direction ? 'rtl' : 'ltr'}
        key={direction}
      >
        {products.map((product) => (
          <SwiperSlide className="pt-6 md:pt-0" key={product.id}>
            <ProductCard
              discount={product.price.discount}
              imgSrc={product.images.primary}
              secondImg={product.images.secondary}
              firstColor={product.colors.first}
              secondColor={product.colors.second}
              title={product.titles[currentLanguage] || product.titles['en']}
              price={product.price.current}
              oldPrice={product.price.old}
              rating={product.rating.average}
              ratingCount={product.rating.count}
              product={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
