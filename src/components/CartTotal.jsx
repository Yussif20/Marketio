import { useTranslation } from 'react-i18next';
import { useProductContext } from '../ProductContext';

const CartTotal = () => {
  const { cartItems } = useProductContext();

  const { t } = useTranslation();

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = Number(item.price.replace('$', '').trim());
      return acc + itemPrice * item.quantity;
    }, 0);
  };

  const shippingFee = 20;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  return (
    <>
      {' '}
      <p className="flex items-center justify-between pb-3 mb-4 border-b border-black dark:border-white">
        {t('pages.cart.cartTotal.subTotal')}:{' '}
        <span>${subtotal.toFixed(2)}</span>
      </p>
      <p className="flex items-center justify-between pb-3 mb-4 border-b border-black dark:border-white">
        {t('pages.cart.cartTotal.shipping')}:{' '}
        <span>${shippingFee.toFixed(2)}</span>
      </p>
      <p className="flex items-center justify-between">
        {t('pages.cart.cartTotal.total')}: <span>${total.toFixed(2)}</span>
      </p>
    </>
  );
};

export default CartTotal;
