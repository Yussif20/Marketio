import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import StarRating from './StarRating';

const ExploreSlider = ({ products }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += 8) {
    chunkedProducts.push(products.slice(i, i + 8));
  }

  return (
    <div className="relative w-full my-8">
      <div className="flex gap-2 absolute right-8 top-[-48px]">
        <button
          ref={prevRef}
          className="text-gray-700 dark:text-white rounded-full p-2 bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
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
          className="text-gray-700 dark:text-white rounded-full p-2 bg-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
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
        spaceBetween={20}
        slidesPerView={1}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {chunkedProducts.map((productChunk, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-4 gap-4">
              {productChunk.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
                    {product.discount}
                  </div>
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="h-[250px] object-cover rounded-lg"
                  />
                  <h4 className="text-base mt-2">{product.title}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-basicRed">{product.price}</span>
                    <span className="text-gray-500 line-through">
                      {product.oldPrice}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-2 text-yellow-500">
                      <StarRating rating={product.rating} />
                    </div>
                    <span className="text-gray-500 text-sm">
                      ({product.ratingCount})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExploreSlider;
