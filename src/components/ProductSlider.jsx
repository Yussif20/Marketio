import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import ProductCard from './ProductCard';

const ProductSlider = ({ products, spaceBetween }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full my-8">
      <div className="flex gap-2 absolute right-8 top-[-48px] ">
        <button
          ref={prevRef}
          className="text-darkPrimary dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-3 hover:bg-gray-100  dark:hover:bg-gray-600"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          ref={nextRef}
          className="text-darkPrimary dark:text-white bg-gray-200 dark:bg-gray-700 rounded-full py-2 px-3 hover:bg-gray-100  dark:hover:bg-gray-600"
        >
          <i className="fa-solid fa-arrow-right"></i>
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
      >
        {products.map((product) => (
          <SwiperSlide className="pt-6 md:pt-0" key={product.id}>
            <ProductCard
              discount={product.discount}
              imgSrc={product.imgSrc}
              title={product.title}
              icon={product.icon}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              ratingCount={product.ratingCount}
              product={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
