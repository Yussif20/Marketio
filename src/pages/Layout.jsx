import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import TopHeader from '@components/TopHeader';

import { AppContext } from '../AppContext';
import { useEffect, useState } from 'react';

import { data } from '../data.js';
import Footer from '../sections/Footer.jsx';

const Layout = () => {
  const [lang, setLang] = useState('en');
  const [products, setProducts] = useState(data);

  useEffect(() => {
    console.log(products);
  }, [lang, products]);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        products,
        setProducts,
      }}
    >
      <TopHeader />
      <Header />
      <main className="font-inter w-screen min-h-screen dark:bg-darkPrimary dark:text-white">
        <Outlet />
      </main>
      <Footer />
    </AppContext.Provider>
  );
};

export default Layout;
