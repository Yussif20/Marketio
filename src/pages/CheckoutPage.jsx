import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import CartTotal from '@components/CartTotal';
import { useProductContext } from './../ProductContext';
import { Link } from 'react-router-dom';
import Button from './../components/Button';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const CheckoutPage = () => {
  const { cartItems, clearCart } = useProductContext();

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = Number(item.price.current);
      return acc + itemPrice * item.quantity;
    }, 0);
  };

  const shippingFee = 20;
  const subtotal = calculateSubtotal();
  const total = subtotal + shippingFee;

  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'bank'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (paymentMethod === 'bank') {
      const card = elements.getElement(CardElement);
      const { error, paymentMethod: stripePaymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card,
        });

      if (error) {
        alert(error.message);
        return;
      }

      const response = await fetch(
        'http://localhost:3001/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: stripePaymentMethod.id,
            amount: total,
          }),
        }
      );

      const paymentResult = await response.json();

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error}`);
      } else {
        alert('Payment successful!');
        clearCart();
        navigate('/success');
      }
    } else {
      alert('Order placed successfully with cash on delivery');
      clearCart();
      navigate('/success');
    }
  };

  return (
    <section className="px-12 py-6 dark:bg-darkPrimary dark:text-white">
      <h5 className="py-10 font-poppins">
        <Link className="text-gray-400" to="/">
          {t('pages.checkout.breadcrumbs.home')} /{' '}
        </Link>
        <Link className="text-gray-400" to="/cart">
          {t('pages.checkout.breadcrumbs.cart')} /{' '}
        </Link>
        <span> {t('pages.checkout.breadcrumbs.checkout')}</span>
      </h5>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-4">
        <div className="w-full sm:flex-1 text-center flex flex-col items-center lg:items-start lg:self-start ">
          <h2 className="text-xl font-semibold mb-4">
            {t('pages.checkout.billingDetails.title')}
          </h2>
          <div className="flex flex-col w-full items-center lg:items-start gap-3">
            <div className="flex flex-col w-full items-center lg:items-start gap-1">
              <label className="font-poppins text-gray-500" htmlFor="name">
                {t('pages.checkout.billingDetails.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
              />
            </div>
            <div className="flex flex-col w-full  items-center lg:items-start gap-1">
              <label className="font-poppins text-gray-500" htmlFor="name">
                {t('pages.checkout.billingDetails.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
              />
            </div>
            <div className="flex flex-col w-full  items-center lg:items-start gap-1">
              <label className="font-poppins text-gray-500" htmlFor="name">
                {t('pages.checkout.billingDetails.address')}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
              />
            </div>
            <div className="flex flex-col w-full  items-center lg:items-start gap-1">
              <label className="font-poppins text-gray-500" htmlFor="name">
                {t('pages.checkout.billingDetails.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="sm:w-[400px]">
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-2"
                >
                  <div className="flex items-center justify-between w-6/12">
                    <span className="flex-1">
                      {item.titles[currentLanguage]}
                    </span>
                    <div className="flex-1 flex items-center justify-center">
                      <img
                        className="max-w-14 max-h-14 sm:max-w-20 sm:max-h-20"
                        src={item.images.primary}
                        alt={item.titles[currentLanguage]}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold flex-1">
                      {item.quantity} x
                    </span>
                    <span className="flex-1">${item.price.current}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between font-bold py-4">
              <CartTotal />
            </div>

            <h2 className="text-xl font-semibold mt-4 mb-2">
              {t('pages.checkout.paymentMethod.title')}
            </h2>
            <div className="mb-4 flex flex-col gap-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio"
                />
                <span>{t('pages.checkout.paymentMethod.cashOnDelivery')}</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio"
                />
                <span>{t('pages.checkout.paymentMethod.bank')}</span>
              </label>
            </div>

            {paymentMethod === 'bank' && (
              <div className="border p-3 rounded">
                <h3 className="text-lg font-semibold mb-2">
                  {t('pages.checkout.paymentMethod.cardText')}
                </h3>
                <CardElement className="p-2 border rounded bg-white" />
              </div>
            )}

            <Button className="mt-4" onClick={handlePlaceOrder}>
              {t('buttons.placeOrder')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
