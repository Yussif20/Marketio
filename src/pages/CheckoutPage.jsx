import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'bank'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });
  const stripe = useStripe();
  const elements = useElements();

  const cartItems = [
    { id: 1, name: 'Product 1', price: 500 },
    { id: 2, name: 'Product 2', price: 300 },
  ];
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

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

      // Process payment with backend API
      const response = await fetch(
        'http://localhost:3001/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodId: stripePaymentMethod.id,
            amount: totalPrice, // Ensure this is in the smallest currency unit (e.g., cents for USD)
          }),
        }
      );

      const paymentResult = await response.json();

      if (paymentResult.error) {
        alert(`Payment failed: ${paymentResult.error}`);
      } else {
        alert('Payment successful!');
        console.log('Payment Result:', paymentResult);
      }
    } else {
      console.log('Order placed with cash on delivery');
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left Section */}
      <div className="col-span-1 md:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold">Billing Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Right Section */}
      <div className="col-span-1 space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.name}</span>
              <span>${item.price / 100}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total</span>
          <span>${totalPrice / 100}</span>
        </div>

        {/* Payment Method */}
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
            <CardElement className="p-2 border rounded" />
          </div>
        )}

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
