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
import { useEffect } from 'react';
import i18next from './i18n';

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
  useEffect(() => {
    const handleDirection = () => {
      const currentLang = i18next.language;
      const direction = currentLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = direction;
    };

    handleDirection();
    i18next.on('languageChanged', handleDirection);

    return () => {
      i18next.off('languageChanged', handleDirection);
    };
  }, []);
  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  );
}

export default App;
