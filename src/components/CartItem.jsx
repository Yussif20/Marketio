// CartItem.jsx
import { useProductContext } from '../ProductContext';
import QuantitySelector from './QuantitySelector';

const CartItem = ({ product }) => {
  const { updateCartItemQuantity, removeFromCart } = useProductContext();

  const handleIncrease = () => {
    updateCartItemQuantity(product.id, product.quantity + 1);
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      updateCartItemQuantity(product.id, product.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <li className="group grid grid-cols-4 items-center justify-between p-4 mb-4 shadow dark:bg-darkSecondary rounded">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={product.imgSrc}
            alt={product.title}
            className="w-16 h-16 rounded"
          />
          <button
            onClick={handleRemove}
            className="absolute top-[-4px] left-[-4px] bg-red-500 hover:bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>

        <h3 className="text-lg font-semibold">{product.title}</h3>
      </div>
      <p className="text-gray-500 dark:text-gray-300 text-center">
        {product.price}
      </p>
      <div className="flex justify-center">
        <QuantitySelector
          quantity={product.quantity}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </div>
      <p className="text-gray-500 dark:text-gray-300 text-center">
        $
        {(Number(product.price.replace('$', '')) * product.quantity).toFixed(2)}
      </p>
    </li>
  );
};

export default CartItem;
