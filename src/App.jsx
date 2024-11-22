import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@pages/Layout';
import Home from '@pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ErrorPage from '@pages/ErrorPage';
import Contact from '@pages/Contact';
import About from '@pages/About';
import Sign from '@pages/Sign';
import SearchResult from '@pages/SearchResult';
import Account from '@pages/Account';
import SignUp from '@sections/SignUp';
import SignIn from '@sections/SignIn';
import Cart from '@pages/Cart';
import Wishlist from '@pages/Wishlist';
import ProductDetails from '@pages/ProductDetails';
import ProfileInfo from './components/ProfileInfo';

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
      {
        path: '/account',
        element: <Account />,
        children: [
          { path: 'profile', element: <ProfileInfo /> },
          // { path: 'orders', element: <AccountOrders /> },
          // { path: 'address', element: <AccountAddress /> },
          // { path: 'payment', element: <AccountPayment /> },
          // { path: 'settings', element: <AccountSettings /> },
          // { path: 'logout', element: <AccountLogout /> },
          { path: '*', element: <ErrorPage /> },
        ],
      },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/:id', element: <ProductDetails /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
