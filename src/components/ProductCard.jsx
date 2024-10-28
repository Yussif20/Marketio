import StarRating from './StarRating';

const ProductCard = ({
  discount,
  imgSrc,
  title,
  price,
  oldPrice,
  rating,
  ratingCount,
}) => {
  return (
    <div className="font-poppins relative group rounded w-[270px] h-[350px] ">
      <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
        {discount}
      </div>
      <div className="relative">
        <img
          src={imgSrc}
          alt="product"
          className="h-[250px] object-cover rounded-lg"
        />
        <div className="absolute top-4 right-2 flex flex-col gap-2">
          <button className="rounded-full p-2 bg-white">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-black hover:text-transparent hover:fill-basicRed transition-all"
            >
              <path
                d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="rounded-full p-2 bg-white">
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-black"
            >
              <path
                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <button className="absolute bottom-0 w-full rounded-br rounded-bl bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity py-2">
          Add to Cart
        </button>
      </div>
      <h4 className="text-base">{title}</h4>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-basicRed">{price}</span>
        <span className="text-gray-500 line-through">{oldPrice}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex gap-2 text-yellow-500">
          <StarRating rating={rating} />
        </div>
        <span className="text-gray-500 text-sm">({ratingCount})</span>
      </div>
    </div>
  );
};

export default ProductCard;
