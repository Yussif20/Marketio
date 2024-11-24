import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { useProductContext } from '../ProductContext';
import { Link } from 'react-router-dom';

const ProductCard = ({
  discount,
  imgSrc,
  secondImg,
  firstColor,
  secondColor,
  title,
  price,
  oldPrice,
  rating,
  ratingCount,
  product,
}) => {
  const { addToFavorite, removeFromFavorite, favorite, addToCart } =
    useProductContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const [img, setImg] = useState(imgSrc);
  const [selectedColor, setSelectedColor] = useState('first');

  useEffect(() => {
    // Check if product is in the favorite list
    const isFav = favorite.some((item) => item.id === product.id);
    setIsFavorite(isFav);
  }, [favorite, product.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite(product.id);
    } else {
      addToFavorite(product);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="font-poppins relative group rounded pb-2 shadow-lg dark:bg-darkSecondary border dark:border-none">
      {discount && (
        <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
          {discount}
        </div>
      )}
      <div className="relative h-[284px] w-full min-w-[300px] rounded bg-white flex items-center justify-center">
        <img
          src={img}
          alt="product"
          className="max-h-[200px] max-w-[200px] rounded-lg"
        />
        <div className="absolute top-4 right-2 flex flex-col gap-2">
          <button
            onClick={toggleFavorite}
            className="rounded-full p-2 bg-white"
          >
            <i
              className={`fa-heart text-2xl fa-beat ${
                isFavorite
                  ? 'fa-solid text-basicRed'
                  : 'fa-regular text-gray-400'
              }`}
            ></i>
          </button>
          <Link to={`/${product.id}`} className="rounded-full p-2 bg-white">
            <i className="fa-regular fa-eye fa-bounce text-gray-400 hover:text-teal-500 text-2xl transition-all duration-300"></i>
          </Link>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-[-4px] w-full rounded-br rounded-bl bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity py-2"
        >
          Add to Cart
        </button>
      </div>
      <div className="px-2 pt-2">
        <div className="flex items-center gap-6">
          <h4 className="text-base">{title}</h4>
          {secondColor && (
            <div className="flex gap-2">
              {/* First Color Button */}
              <button
                className={`rounded-full border-2 text-sm ${
                  selectedColor === 'first'
                    ? 'border-black'
                    : 'border-transparent'
                }`}
                style={{
                  color: firstColor,
                  borderColor:
                    selectedColor === 'first' ? firstColor : 'transparent',
                }}
                onClick={() => {
                  setSelectedColor('first');
                  setImg(imgSrc);
                }}
              >
                <i className="fa-solid fa-circle p-1"></i>
              </button>
              <button
                className={`rounded-full border-2 text-sm ${
                  selectedColor === 'second'
                    ? 'border-black'
                    : 'border-transparent'
                }`}
                style={{
                  color: secondColor,
                  borderColor:
                    selectedColor === 'second' ? secondColor : 'transparent',
                }}
                onClick={() => {
                  setSelectedColor('second');
                  setImg(secondImg);
                }}
              >
                <i className="fa-solid fa-circle p-1"></i>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-2">
          <span className="text-basicRed">${price}</span>
          <span className="text-gray-500 line-through">${oldPrice}</span>
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
