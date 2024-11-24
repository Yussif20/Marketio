import Header from '@components/Header';
import TopHeader from '@components/TopHeader';
import Footer from '@sections/Footer.jsx';
import { Outlet } from 'react-router-dom';

import { ProductProvider } from '../ProductContext.jsx';

export const Layout = () => {
  return (
    <ProductProvider>
      <TopHeader />
      <Header />
      <main className="font-inter w-screen min-h-screen bg-white dark:bg-darkPrimary dark:text-white">
        <Outlet />
      </main>
      <Footer />
    </ProductProvider>
  );
};
