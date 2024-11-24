// Cart.jsx
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';
import CartItem from '@components/CartItem';
import Button from '@components/Button';
import CartTotal from '../components/CartTotal';

export const Cart = () => {
  const { cartItems } = useProductContext();

  return (
    <section className="mx-2 sm:mx-6 md:mx-10 lg:mx-12">
      <h5 className="py-10">
        <Link className="text-gray-400" to="/">
          Home /
        </Link>
        <span> Cart</span>
      </h5>
      {cartItems.length > 0 ? (
        <>
          <div className="w-10/12 mx-auto py-10">
            <div className="grid grid-cols-4 place-items-center shadow p-4 rounded font-semibold mb-6 dark:bg-darkSecondary">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            <ul>
              {cartItems.map((product) => (
                <CartItem product={product} key={product.id} />
              ))}
            </ul>
          </div>
          <div className="py-12 w-full flex flex-col gap-6 lg:flex-row items-center justify-evenly">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                className="max-w-sm bg-gray-100 dark:bg-darkSecondary border outline-none rounded p-3"
                type="text"
                placeholder="Coupon Code"
              />
              <Button>Apply Coupon</Button>
            </div>
            <div className=" p-6 border-[1.5px] border-black w-11/12 sm:w-[400px] rounded dark:bg-darkSecondary">
              <h4 className="text-xl font-medium mb-4">Cart Total</h4>
              <CartTotal />
              <Link
                to="/checkout"
                className="flex items-center justify-center my-5"
              >
                <Button>Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl text-center">
            There are no Items in your cart!
          </p>
          <div className="flex items-center justify-center mt-6">
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
