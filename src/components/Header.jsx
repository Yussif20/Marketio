import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  let linkStyles = `hover:font-semibold hover:underline transition-all duration-300`;

  return (
    <header className="w-full border-b border-gray-300 py-4 dark:bg-darkSecondary dark:text-white">
      <div className="flex items-center justify-between mx-12">
        <h1 className="text-2xl leading-6 font-bold">
          MAR<span className="text-basicRed">KET</span>IO
        </h1>
        <nav>
          <ul className="flex text-base gap-10">
            <li className={linkStyles}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? ' text-basicRed underline' : ''
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className={linkStyles}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? ' text-basicRed underline' : ''
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li className={linkStyles}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? ' text-basicRed underline' : ''
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className={linkStyles}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? ' text-basicRed underline' : ''
                }
                to="/sign"
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-6">
          <SearchBar />
          <Link to="/favorite">
            <i className="fa-regular fa-heart hover:text-basicRed text-2xl transition-all duration-300"></i>
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
          <button>
            <i className="fa-regular fa-user"></i>
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
