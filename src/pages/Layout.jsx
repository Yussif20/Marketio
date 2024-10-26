import Header from '@components/Header';
import { Outlet } from 'react-router-dom';
import TopHeader from '@components/TopHeader';

const Layout = () => {
  return (
    <div className="font-inter w-screen">
      <TopHeader />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
