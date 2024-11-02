import { Outlet } from 'react-router-dom';

import signImage from '../assets/sign/sign.png';

const Sign = () => {
  return (
    <section className="py-20 dark:bg-darkPrimary dark:text-white font-poppins flex gap-32">
      <img src={signImage} alt="Cart Image" />
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </section>
  );
};

export default Sign;
