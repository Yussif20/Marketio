import Header from '@components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="font-inter">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
