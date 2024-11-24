import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import JustForYou from '@sections/JustForYou';
import StarRating from '@components/StarRating';
import Button from '@components/Button';
import QuantitySelector from '@components/QuantitySelector';

export const ProductDetails = () => {
  const { id } = useParams();
  const {
    products,
    cartItems,
    addToCart,
    handleIncrease,
    handleDecrease,
    favorite,
    addToFavorite,
    removeFromFavorite,
  } = useProductContext();
  const [product, setProduct] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [img, setImg] = useState(null);

  useEffect(() => {
    if (product) {
      setImg(product.imgSrc);
      setSelectedColor(product.firstColor);
    }
  }, [product]);

  const [selectedColor, setSelectedColor] = useState('first');

  useEffect(() => {
    const foundProduct = products.find((product) => product.id === Number(id));
    setProduct(foundProduct);

    if (foundProduct) {
      const cartItem = cartItems.find((item) => item.id === foundProduct.id);
      setCartQuantity(cartItem ? cartItem.quantity : 0);

      // Check if product is in favorites
      const isFav = favorite.some((item) => item.id === foundProduct.id);
      setIsFavorite(isFav);
    }
  }, [id, products, cartItems, favorite]);

  const handleAddToCart = () => {
    if (cartQuantity === 0) {
      addToCart(product, 1);
    }
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorite(product.id);
    } else {
      addToFavorite(product);
    }
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <section className="mx-auto px-4 py-4 sm:py-0 sm:pb-4 sm:px-12 shadow-lg rounded-lg">
      <h5 className="py-10">
        <Link className="text-gray-400" to="/">
          Home /
        </Link>
        <span> {product.title}</span>
      </h5>
      <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
        <div className="flex-1  rounded bg-white flex items-center justify-center shadow border">
          <img
            className="md:h-[550px] md:max-w-[500px]"
            src={img}
            alt={product.title}
          />
        </div>
        <div className="flex items-center text-center flex-col gap-4 flex-1 font-poppins">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            {product.secondColor && (
              <div className="flex gap-2">
                <button
                  className={`rounded-full border-2 text-sm ${
                    selectedColor === 'first'
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                  style={{
                    color: product.firstColor,
                    borderColor:
                      selectedColor === 'first'
                        ? product.firstColor
                        : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedColor('first');
                    setImg(product.imgSrc);
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
                    color: product.secondColor,
                    borderColor:
                      selectedColor === 'second'
                        ? product.secondColor
                        : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedColor('second');
                    setImg(product.secondImg);
                  }}
                >
                  <i className="fa-solid fa-circle p-1"></i>
                </button>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-2 text-yellow-500">
              <StarRating rating={product.rating} />
            </div>
            <span className="text-gray-500 text-sm">
              ({product.ratingCount})
            </span>
          </div>
          <h2 className="text-2xl">${product.price}</h2>
          <p className="text-lg mb-4 w-10/12 border-b pb-4">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button className="order-2 sm:order-1" onClick={handleAddToCart}>
              Buy Now
            </Button>
            <div className="flex items-center gap-6 order-1 sm:order-2">
              {' '}
              <QuantitySelector
                quantity={cartQuantity}
                onIncrease={() => handleIncrease(product)}
                onDecrease={() => handleDecrease(product)}
              />
              <button
                className={`p-2 rounded bg-white border-[2px] ${
                  isFavorite ? 'border-basicRed' : 'border-gray-300'
                }`}
                onClick={toggleFavorite}
              >
                <i
                  className={`text-2xl fa-heart ${
                    isFavorite
                      ? 'fa-solid text-red-500'
                      : 'fa-regular text-gray-400'
                  }`}
                ></i>
              </button>
            </div>
          </div>
          <div className="flex flex-col border rounded mt-3 mb-8 sm:mb-2">
            <div className="border-b p-2 flex items-center">
              <i className="fa-solid fa-truck-fast fa-bounce p-4 text-4xl"></i>
              <div>
                <h3 className="font-medium mb-1">Free Delivery</h3>
                <p className="underline">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="border-b p-2 flex items-center">
              <i className="fa-solid fa-repeat fa-spin p-4 text-4xl"></i>
              <div>
                <h3 className="font-medium mb-1">Return Delivery</h3>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JustForYou headline="Related Items" />
    </section>
  );
};
