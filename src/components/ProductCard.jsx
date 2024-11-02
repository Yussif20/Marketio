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
    <div className="font-poppins relative group rounded pb-2 shadow-lg dark:bg-darkSecondary border dark:border-none">
      {discount && (
        <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
          {discount}
        </div>
      )}
      <div className=" relative h-[284px] w-full min-w-[300px] rounded bg-white flex items-center justify-center">
        <img
          src={imgSrc}
          alt="product"
          className="max-h-[200px] max-w-[200px] rounded-lg"
        />
        <div className="absolute top-4 right-2 flex flex-col gap-2">
          <button className="rounded-full p-2 bg-white">
            <i className="fa-solid fa-heart fa-beat text-gray-400 hover:text-basicRed text-2xl transition-all duration-300"></i>
          </button>
          <button className="rounded-full p-2 bg-white">
            <i className="fa-regular fa-eye fa-bounce text-gray-400 hover:text-basicRed text-2xl transition-all duration-300"></i>
          </button>
        </div>
        <button className="absolute bottom-[-4px] w-full rounded-br rounded-bl bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity py-2">
          Add to Cart
        </button>
      </div>
      <div className="px-2 pt-2">
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
    </div>
  );
};

export default ProductCard;
