import { useProductContext } from '../ProductContext';
import JustForYou from '@sections/JustForYou';
import Button from '@components/Button';
import StarRating from '@components/StarRating';
import { useTranslation } from 'react-i18next';

export const Wishlist = () => {
  const { favorite, addToCart, removeFromFavorite, addToBag } =
    useProductContext();

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  return (
    <section className="py-6 px-2 sm:px-12">
      <div className="flex flex-col sm:flex-row items-center justify-between my-6">
        <h2 className="font-poppins text-xl">
          {t('pages.wishlist.title')}({favorite.length})
        </h2>
        {favorite.length > 0 && (
          <Button onClick={addToBag} variant="secondary">
            {t('buttons.moveAllToBag')}
          </Button>
        )}
      </div>
      {favorite.length === 0 ? (
        <p className="text-gray-400">{t('pages.wishlist.emptyText')}</p>
      ) : (
        <ul className="flex items-center flex-wrap gap-2 justify-evenly">
          {favorite.map((product) => (
            <div
              key={product.id}
              className="font-poppins relative group rounded pb-2 my-4 shadow-lg dark:bg-darkSecondary border dark:border-none"
            >
              {product.price.discount && (
                <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
                  {product.price.discount}
                </div>
              )}
              <div className=" relative h-[284px] w-full min-w-[300px] rounded bg-white flex items-center justify-center">
                <img
                  src={product.images.primary}
                  alt="product"
                  className="max-h-[200px] max-w-[200px] rounded-lg"
                />
                <div className="absolute top-4 right-2 flex flex-col gap-2">
                  <button
                    onClick={() => removeFromFavorite(product.id)}
                    className="rounded-full p-2 bg-white"
                  >
                    <i className="fa-solid fa-trash fa-bounce text-black hover:text-basicRed text-2xl transition-all duration-300"></i>
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-[-4px] w-full rounded-br rounded-bl bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity py-2"
                >
                  {t('buttons.addToCart')}
                </button>
              </div>
              <div className="px-2 pt-2">
                <h4 className="text-base">{product.titles[currentLanguage]}</h4>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-basicRed">{product.price.current}</span>
                  <span className="text-gray-500 line-through">
                    {product.price.old}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-2 text-yellow-500">
                    <StarRating rating={product.rating.average} />
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({product.rating.count})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
      <JustForYou headline={t('pages.wishlist.justForYou')} />
    </section>
  );
};
