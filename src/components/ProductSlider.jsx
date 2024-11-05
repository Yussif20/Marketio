import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';
import StarRating from './StarRating';
import ProductCard from './ProductCard';

const ProductSlider = ({ products, spaceBetween }) => {
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
          <SwiperSlide key={product.id}>
            <ProductCard
              discount={product.discount}
              imgSrc={product.imgSrc}
              title={product.title}
              icon={product.icon}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              ratingCount={product.ratingCount}
            >
              {/* Content for each slide */}
              <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
                {product.discount}
              </div>
              <div className="relative">
                <img
                  src={product.imgSrc}
                  alt="product"
                  className="h-[250px] object-cover rounded-lg"
                />
                <div className="absolute top-4 right-2 flex flex-col gap-2">
                  {/* Buttons */}
                </div>
                <button className="absolute bottom-0 w-full rounded-br rounded-bl bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity py-2">
                  Add to Cart
                </button>
              </div>
              <h4 className="text-base">{product.title}</h4>
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
            </ProductCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
