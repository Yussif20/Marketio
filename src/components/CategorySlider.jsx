import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import CategoryCard from './CategoryCard';
import { useProductContext } from '../ProductContext';

const CategorySlider = ({ products }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { direction } = useProductContext();

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
        spaceBetween={10}
        slidesPerView={6}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 5 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 6 },
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        dir={!direction ? 'rtl' : 'ltr'}
        key={direction}
      >
        {products.map((product) => (
          <SwiperSlide className="pt-6" key={product.id}>
            <CategoryCard title={product.title} icon={product.icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
