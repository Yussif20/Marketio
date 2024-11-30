// CartItem.jsx
import { useProductContext } from '../ProductContext';
import QuantitySelector from './QuantitySelector';

const CartItem = ({ product }) => {
  const { handleIncrease, handleDecrease, removeFromCart } =
    useProductContext();

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <li className="group grid  grid-cols-4 items-center justify-between p-4 mb-4 shadow dark:bg-darkSecondary rounded relative">
      <div className="flex items-center justify-center">
        <div className="md:relative flex items-center justify-center flex-1">
          <img
            src={product.imgSrc}
            alt={product.title}
            className="hidden md:block w-16 h-16 rounded "
          />
          <button
            onClick={handleRemove}
            className="absolute top-[-4px] left-[-4px] bg-red-500 hover:bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        <h3 className="text-sm sm:text-lg font-semibold text-center flex-1">
          {product.title}
        </h3>
      </div>
      <p className="text-gray-500 dark:text-gray-300 text-center text-sm sm:text-base">
        ${product.price}
      </p>
      <div className="flex justify-center">
        <QuantitySelector
          quantity={product.quantity}
          onIncrease={() => handleIncrease(product)}
          onDecrease={() => handleDecrease(product)}
        />
      </div>
      <p className="text-gray-500 dark:text-gray-300 text-center text-sm sm:text-base">
        $
        {(Number(product.price.replace('$', '')) * product.quantity).toFixed(2)}
      </p>
    </li>
  );
};

export default CartItem;
