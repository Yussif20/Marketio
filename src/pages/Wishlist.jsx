import { useProductContext } from '../ProductContext';
import JustForYou from '@sections/JustForYou';
import Button from '@components/Button';
import StarRating from '@components/StarRating';

const Wishlist = () => {
  const {
    favorite,
    addToCart,
    clearFavorites,
    clearCart,
    removeFromFavorite,
    addToBag,
  } = useProductContext();

  return (
    <section className="py-6 px-2 sm:px-12">
      <div className="flex flex-col sm:flex-row items-center justify-between my-6">
        <h2 className="font-poppins text-xl">Wishlist({favorite.length})</h2>
        {favorite.length > 0 && (
          <Button onClick={addToBag} variant="secondary">
            Move All To Bag
          </Button>
        )}
      </div>
      {favorite.length === 0 ? (
        <p className="text-gray-400">No items in your favorite list.</p>
      ) : (
        <ul className="flex items-center flex-wrap gap-2 justify-evenly">
          {favorite.map((product) => (
            <div
              key={product.id}
              className="font-poppins relative group rounded pb-2 my-4 shadow-lg dark:bg-darkSecondary border dark:border-none"
            >
              {product.discount && (
                <div className="absolute z-10 top-2 left-2 bg-basicRed text-white py-1 px-3 rounded-[4px] text-xs">
                  {product.discount}
                </div>
              )}
              <div className=" relative h-[284px] w-full min-w-[300px] rounded bg-white flex items-center justify-center">
                <img
                  src={product.imgSrc}
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
                  Add to Cart
                </button>
              </div>
              <div className="px-2 pt-2">
                <h4 className="text-base">{product.title}</h4>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-basicRed">{product.price}</span>
                  <span className="text-gray-500 line-through">
                    {product.oldPrice}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex gap-2 text-yellow-500">
                    <StarRating rating={product.rating} />
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({product.ratingCount})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
      <JustForYou headline="Just For You" />
      <div className="flex flex-col sm:flex-row gap-6 w-full items-center justify-between py-6">
        <Button onClick={() => clearFavorites()}>Clear Favorite</Button>
        <Button onClick={() => clearCart()}>Clear Cart</Button>
      </div>
    </section>
  );
};

export default Wishlist;
