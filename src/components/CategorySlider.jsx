import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import CategoryCard from './CategoryCard';

const CategorySlider = ({ products }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-full my-8">
      <div className="flex gap-2 absolute right-8 top-[-48px] ">
        <button
          ref={prevRef}
          className="text-gray-700 dark:text-white rounded-full p-2 bg-gray-200 
            hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1L1 8L8 15M1 8H17"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          ref={nextRef}
          className="text-gray-700 dark:text-white rounded-full p-2 bg-gray-200 
            hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 8H18M18 8L11 1M18 8L11 15"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <CategoryCard title={product.title} icon={product.icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
