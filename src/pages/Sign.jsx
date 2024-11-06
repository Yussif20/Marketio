import { Outlet } from 'react-router-dom';

import signImage from '../assets/sign/sign.png';

const Sign = () => {
  return (
    <section className="py-20 px-4 md:px-2 dark:bg-darkPrimary dark:text-white font-poppins flex items-center flex-col lg:flex-row gap-16 xl:gap-32">
      <img
        src={signImage}
        alt="Cart Image"
        className="size-96 md:size-[600px] xl:size-[800px] "
      />
      <div className="flex items-center justify-center md:pr-6">
        <Outlet />
      </div>
    </section>
  );
};

export default Sign;
