import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import ProductCard from './ProductCard';
import { useProductContext } from '../ProductContext';
import { useTranslation } from 'react-i18next';

const ExploreSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { direction, products } = useProductContext();

  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';
  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += 8) {
    chunkedProducts.push(products.slice(i, i + 8));
  }

  return (
    <div className="relative w-full my-8">
      <div
        className={`flex gap-2 absolute ${
          direction === 'ltr' ? 'right-8' : 'left-8'
        } top-[-48px]`}
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
        spaceBetween={20}
        slidesPerView={1}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        dir={!direction ? 'rtl' : 'ltr'}
        key={direction}
      >
        {chunkedProducts.map((productChunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
              {productChunk.map((product) => (
                <ProductCard
                  key={product.id}
                  discount={product.price.discount}
                  imgSrc={product.images.primary}
                  secondImg={product.images.secondary}
                  firstColor={product.colors.first}
                  secondColor={product.colors.second}
                  title={product.titles[currentLanguage]}
                  price={product.price.current}
                  oldPrice={product.price.old}
                  rating={product.rating.average}
                  ratingCount={product.rating.count}
                  product={product}
                />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExploreSlider;
``;
