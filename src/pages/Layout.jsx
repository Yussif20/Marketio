import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import TopHeader from '@components/TopHeader';
import Footer from '@sections/Footer.jsx';

import { ProductProvider } from '../ProductContext.jsx';

const Layout = () => {
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

export default Layout;
