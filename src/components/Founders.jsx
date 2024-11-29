// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';

const Founders = () => {
  const { t } = useTranslation();
  const foundersData = t('pages.about.founders.data', { returnObjects: true });
  return (
    <div className="flex justify-center items-center mt-16">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={50}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        allowTouchMove={true}
        className="w-full max-w-3xl "
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {foundersData.map((founder, index) => (
          <SwiperSlide
            className="flex flex-col items-center gap-8 w-[370px] mb-12 shadow-md px-2 py-4 rounded"
            key={index}
          >
            <img className="w-full" src={founder.img} alt={founder.name} />
            <div className="flex flex-col gap-2 text-center text-darkPrimary dark:text-white">
              <h3 className="mt-4">{founder.name}</h3>
              <p>{founder.job}</p>
              <div className="flex gap-3 mx-auto">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-square-x-twitter"></i>
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Founders;
