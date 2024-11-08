import StarRating from '@components/StarRating';
import { productsData } from '../data';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import { useProductContext } from '../ProductContext';

const JustForYou = ({ headline }) => {
  const { addToCart } = useProductContext();
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between my-6">
        <h3 className="relative ml-6 font-poppins text-xl after:content-[' '] after:w-5 after:h-10 after:bg-red-500 after:absolute after:left-[-24px] after:top-[-8px] ">
          {headline}
        </h3>
        <Link to="../">
          <Button variant="secondary">See All</Button>
        </Link>
      </div>
      <div className="flex items-center flex-wrap gap-2 justify-evenly">
        {productsData.map((product, index) => {
          if (index >= 4) return;
          return (
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
                  <Link
                    to={`/${product.id}`}
                    className="rounded-full p-2 bg-white"
                  >
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
          );
        })}
      </div>
    </>
  );
};

export default JustForYou;