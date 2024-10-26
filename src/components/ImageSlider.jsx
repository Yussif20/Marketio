// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import { sliderData } from '../data';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const ImageSlider = () => {
  return (
    <div className="flex justify-center items-center my-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        allowTouchMove={false}
        className="w-full max-w-3xl"
      >
        {sliderData.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                className="w-full max-w-[900px] max-h-[350px] object-cover"
                src={product.image}
                alt={product.title}
              />
              <div className="absolute z-10 text-white top-16 left-8 ">
                <h3>{product.title}</h3>
                <p className=" leading-[60px] text-5xl font-semibold my-4">
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

export default ImageSlider;
