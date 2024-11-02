// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { heroSliderData } from '../data';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const HeroSlider = () => {
  return (
    <div className="flex justify-center items-center my-12 max-w-[320px] sm:max-w-[550px] lg:max-w-[900px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        allowTouchMove={true}
        className="w-full max-w-3xl"
      >
        {heroSliderData.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                className="w-full  max-h-[350px] object-cover"
                src={product.image}
                alt={product.title}
              />
              <div className="absolute z-10 text-white top-20 left-8 sm:top-16 ">
                <h3>{product.title}</h3>
                <p className="text-2xl sm:text-5xl font-semibold md:my-4">
                  Up to 10%
                  <br />
                  off Voucher
                </p>
                <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                  ShopNow
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
