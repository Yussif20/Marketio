import { Link, Outlet } from 'react-router-dom';

import signImage from '@assets/sign/sign.png';
import { useProductContext } from '../ProductContext';

import Button from '@components/Button';

const Sign = () => {
  const { currentUser } = useProductContext();

  return (
    <section className="py-20 px-4 md:px-2 dark:bg-darkPrimary dark:text-white font-poppins flex items-center flex-col lg:flex-row gap-16 xl:gap-32">
      <img
        src={signImage}
        alt="Cart Image"
        className="size-96 md:size-[600px] xl:size-[800px] "
      />

      {currentUser ? (
        <div className="flex flex-col gap-4 text-center">
          <h3 className=" text-4xl">
            Welcome,{' '}
            <span className="text-basicRed">
              {currentUser.email.split('@')[0]}
            </span>
          </h3>
          <p className="text-2xl">You are already signed in!</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center md:pr-6">
          <Outlet />
        </div>
      )}
    </section>
  );
};

export default Sign;
