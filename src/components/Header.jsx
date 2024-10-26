import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  let linkStyles = `hover:font-semibold hover:text-basicRed hover:underline transition-all duration-300`;

  return (
    <header className="w-full border-b border-gray-300 py-4 dark:bg-darkSecondary dark:text-white">
      <div className="flex items-center justify-between w-10/12 mx-auto">
        <h1 className="text-2xl leading-6 font-bold">
          MAE<span className="text-basicRed">KET</span>IO
        </h1>
        <nav>
          <ul className="flex text-base gap-10">
            <li className={linkStyles}>
              <Link to="/">Home</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/contact">Contact</Link>
            </li>
            <li className={linkStyles}>
              <Link to="/about">About</Link>
            </li>
            <li className={linkStyles}>
              <Link href="/sign">Sign Up</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <SearchBar />
          <Link to="/favorite">
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-black dark:text-white"
            >
              <path
                d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link to="/cart">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current text-black dark:text-white"
            >
              <path
                d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 5H7L10 22H26"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
