import { Link } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@sections/Footer';
import Button from '@components/Button';

export const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-between dark:bg-darkPrimary dark:text-white">
      <Header />
      <div className="mx-12 h-[500px] ">
        <div>
          <h5 className="py-10 font-poppins">
            <Link className="text-gray-400" to="/">
              Home /{' '}
            </Link>
            <span>404 error</span>
          </h5>
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <h2 className="text-[110px]">404 Not Found</h2>
            <p>Your visited page not found. You may go home page.</p>
            <Link to="/">
              <Button>Back to home page</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
