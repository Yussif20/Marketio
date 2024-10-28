import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { FaHeart, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRef } from 'react';

const products = [
  { id: 1, imgSrc: 'slider/controller.jpg', price: '$120', discount: '-40%' },
  { id: 2, imgSrc: 'slider/headphones.jpg', price: '$960', discount: '-35%' },
  { id: 3, imgSrc: 'slider/watch.jpg', price: '$370', discount: '-30%' },
  { id: 4, imgSrc: 'slider/lens.jpg', price: '$375', discount: '-25%' },
  // Add more products as needed
];

const ProductSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="flex flex-col gap-6">
      <h3>Today&apos;s</h3>
      <h2>Flash Sales</h2>
      <div className="flex">
        <button
          ref={prevRef}
          className=" bg-gray-800 text-white rounded-full p-2 z-10 hover:bg-gray-700"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className=" bg-gray-800 text-white rounded-full p-2 z-10 hover:bg-gray-700"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="relative w-full my-8">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          className="pt-8"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative group p-4 bg-white rounded-lg shadow-md">
                <div className="absolute top-2 left-2 bg-red-200 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                  {product.discount}
                </div>
                <div className="relative">
                  <img
                    src={product.imgSrc}
                    alt="product"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Add to Cart
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-red-600 font-bold">
                    {product.price}
                  </span>
                  <div className="flex gap-2 text-gray-500">
                    <FaHeart />
                    <FaEye />
                  </div>
                </div>
                <div className="mt-2 flex">
                  <div className="flex text-yellow-500">
                    {/* Display stars for rating */}
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <span key={index}>⭐</span>
                      ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductSlider;
