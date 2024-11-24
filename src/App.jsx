import '@fortawesome/fontawesome-free/css/all.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  About,
  Cart,
  CheckoutPage,
  Contact,
  ErrorPage,
  Home,
  Layout,
  ProductDetails,
  SearchResult,
  Sign,
  Wishlist,
} from '@pages';
import { SignUp, SignIn } from '@sections';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      {
        path: '/sign',
        element: <Sign />,
        children: [
          { index: true, element: <SignUp /> },
          { path: 'in', element: <SignIn /> },
        ],
      },
      { path: '/search', element: <SearchResult /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/:id', element: <ProductDetails /> },
    ],
  },
]);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  );
}

export default App;
