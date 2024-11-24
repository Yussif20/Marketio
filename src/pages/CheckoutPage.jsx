import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import CartTotal from '@components/CartTotal';
import { useProductContext } from './../ProductContext';
import { Link } from 'react-router-dom';
import Button from './../components/Button';

import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const { cartItems, clearCart } = useProductContext();

  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const itemPrice = Number(item.price.replace('$', '').trim());
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
        navigate('/');
      }
    } else {
      alert('Order placed successfully with cash on delivery');
      clearCart();
      navigate('/');
    }
  };

  return (
    <section className="mx-12 dark:bg-darkPrimary dark:text-white">
      <h5 className="py-10 font-poppins">
        <Link className="text-gray-400" to="/">
          Home /{' '}
        </Link>
        <Link className="text-gray-400" to="/cart">
          Cart /{' '}
        </Link>
        <span> Checkout</span>
      </h5>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Billing Details</h2>
          <div className="flex flex-col">
            <label className="font-poppins text-gray-500" htmlFor="name">
              First Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-poppins text-gray-500" htmlFor="name">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-poppins text-gray-500" htmlFor="name">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-8/12 p-2 rounded outline-none bg-[#f5f5f5] dark:bg-darkSecondary"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-poppins text-gray-500" htmlFor="name">
              Email
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
        <div className="col-span-1 space-y-4 px-8">
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between pb-2"
              >
                <div className="flex items-center justify justify-between w-6/12">
                  <span>{item.title}</span>
                  <img
                    className="max-w-20"
                    src={item.imgSrc}
                    alt={item.title}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.quantity} x</span>
                  <span>${item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-between font-bold pt-2">
            <CartTotal />
          </div>

          <h2 className="text-xl font-semibold mt-4">Payment Method</h2>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-radio"
              />
              <span>Cash on Delivery</span>
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
              <span>Bank</span>
            </label>
          </div>

          {paymentMethod === 'bank' && (
            <div className="border p-4 rounded">
              <h3 className="text-lg font-semibold">Enter Card Details</h3>
              <CardElement className="p-2 border rounded bg-white" />
            </div>
          )}

          <Button onClick={handlePlaceOrder}>Place Order</Button>
        </div>
      </div>
    </section>
  );
};
