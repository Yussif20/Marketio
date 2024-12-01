import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import JustForYou from '@sections/JustForYou';
import StarRating from '@components/StarRating';
import Button from '@components/Button';
import QuantitySelector from '@components/QuantitySelector';
import { useTranslation } from 'react-i18next';

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
    updateRating,
    direction,
  } = useProductContext();

  const [cartQuantity, setCartQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [img, setImg] = useState(null);
  const [selectedColor, setSelectedColor] = useState('first');
  const [selectedRating, setSelectedRating] = useState(0);
  const product = products.find((product) => product.id === Number(id));

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';

  useEffect(() => {
    if (product) {
      setImg(product.images.primary);
      setSelectedColor('first');
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      setImg(product.images.primary);
      const cartItem = cartItems.find((item) => item.id === product.id);
      setCartQuantity(cartItem ? cartItem.quantity : 0);

      const isFav = favorite.some((item) => item.id === product.id);
      setIsFavorite(isFav);
    }
  }, [id, cartItems, favorite, product]);

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

  const handleSaveRating = () => {
    if (selectedRating > 0) {
      updateRating(product.id, selectedRating);
      alert('Thank you for your rating!');
      setSelectedRating(0); // Reset the rating selection
    } else {
      alert('Please select a rating before saving.');
    }
  };

  if (!product) {
    return (
      <div className="text-center text-gray-500">
        {t('pages.productDetails.loading')}
      </div>
    );
  }

  return (
    <section className="mx-auto px-4 py-4 sm:py-0 sm:pb-4 sm:px-12 shadow-lg rounded-lg">
      <h5 className="py-10">
        <Link className="text-gray-400" to="/">
          {t('pages.productDetails.home')} /
        </Link>
        <span> {product.titles[currentLanguage]}</span>
      </h5>
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
        <div className="flex-1 rounded bg-[#F5F5F5] flex items-center justify-center shadow border">
          <img
            className="md:h-[520px] md:max-w-[500px]"
            src={img}
            alt={product.titles[currentLanguage]}
          />
        </div>
        <div className="flex items-center text-center flex-col gap-4 flex-1 font-poppins">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold">
              {product.titles[currentLanguage]}
            </h2>
            {product.colors.second && (
              <div className="flex gap-2">
                <button
                  className={`rounded-full border-2 text-sm ${
                    selectedColor === 'first'
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                  style={{
                    color: product.colors.first,
                    borderColor:
                      selectedColor === 'first'
                        ? product.colors.first
                        : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedColor('first');
                    setImg(product.images.primary);
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
                    color: product.colors.second,
                    borderColor:
                      selectedColor === 'second'
                        ? product.colors.second
                        : 'transparent',
                  }}
                  onClick={() => {
                    setSelectedColor('second');
                    setImg(product.images.secondary);
                  }}
                >
                  <i className="fa-solid fa-circle p-1"></i>
                </button>
              </div>
            )}
          </div>
          {/* Product Rating  */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-2 text-yellow-500">
              <StarRating rating={product.rating.average} />
            </div>
            <span className="text-gray-500 text-sm">
              ({product.rating.count})
            </span>
          </div>
          {/* User Rating */}
          <div
            className={`flex items-center gap-6 my-4 ${
              direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Star Rating */}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-2xl ${
                    selectedRating >= star ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={() => setSelectedRating(star)}
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              ))}
            </div>

            {/* Save Button */}
            <Button className="text-sm" size="sm" onClick={handleSaveRating}>
              {t('buttons.saveRating')}
            </Button>
          </div>

          {/* Product Details  */}
          <h2 className="text-2xl">${product.price.current}</h2>
          <p className="text-lg mb-4 w-10/12 border-b pb-4">
            {product.descriptions[currentLanguage]}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button className="order-2 sm:order-1" onClick={handleAddToCart}>
              {t('buttons.buyNow')}
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
                <h3 className="font-medium mb-1">
                  {' '}
                  {t('pages.productDetails.freeDelivery.title')}
                </h3>
                <p className="underline">
                  {t('pages.productDetails.freeDelivery.text')}
                </p>
              </div>
            </div>
            <div className="border-b p-2 flex items-center">
              <i className="fa-solid fa-repeat fa-spin p-4 text-4xl"></i>
              <div>
                <h3 className="font-medium mb-1">
                  {t('pages.productDetails.return.title')}
                </h3>
                <p>{t('pages.productDetails.return.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <JustForYou headline="Related Items" />
    </section>
  );
};
