import { Link, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import ThemeSwitcher from './ThemeSwitcher';
import { useState } from 'react';
import { useProductContext } from '../ProductContext';
import AccountMenu from './AccountMenu';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { favorite, cartItems } = useProductContext();

  const { t } = useTranslation();

  let linkStyles = `hover:font-semibold hover:underline transition-all duration-300`;
  const favoriteCount = favorite.length;
  const cartItemsCount = cartItems.length;

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="w-full border-b border-gray-300 py-4 dark:bg-darkPrimary dark:text-white">
      <div className="flex items-center justify-evenly mx-2 sm:mx-4 md:mx-12">
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link to="/">
            {t('header.logoFirst')}
            <span className="text-basicRed">{t('header.logoColored')}</span>
            {t('header.logoSecond')}
          </Link>
        </h1>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            <i
              className={`fa-solid text-xl sm:text-2xl  ${
                showMenu ? 'fa-times' : 'fa-bars'
              }`}
            ></i>
          </button>
        </div>
        <nav className="hidden w-full lg:w-6/12 lg:flex justify-evenly items-center text-base list-none ">
          <li className={linkStyles}>
            <NavLink
              className={({ isActive }) =>
                isActive ? ' text-basicRed underline' : ''
              }
              to="/"
            >
              {t('header.home')}
            </NavLink>
          </li>
          <li className={linkStyles}>
            <NavLink
              className={({ isActive }) =>
                isActive ? ' text-basicRed underline' : ''
              }
              to="/contact"
            >
              {t('header.contact')}
            </NavLink>
          </li>
          <li className={linkStyles}>
            <NavLink
              className={({ isActive }) =>
                isActive ? ' text-basicRed underline' : ''
              }
              to="/about"
            >
              {t('header.about')}
            </NavLink>
          </li>
          <li className={linkStyles}>
            <NavLink
              className={({ isActive }) =>
                isActive ? ' text-basicRed underline' : ''
              }
              to="/sign"
            >
              {t('header.signup')}
            </NavLink>
          </li>
        </nav>

        <button className="block sm:hidden mt-2" onClick={toggleSearchBar}>
          <i
            className={`fa-solid fa-magnifying-glass text-xl sm:text-2xl  hover:text-basicRed ${
              showSearchBar ? 'text-basicRed' : ''
            }`}
          ></i>
        </button>

        <div className="flex items-center justify-evenly gap-6 mt-2">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          <div className="flex items-center gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive ? ' text-basicRed underline relative' : 'relative'
              }
              to="/wishlist"
            >
              <i className="fa-regular fa-heart hover:text-basicRed text-xl sm:text-2xl transition-all duration-300"></i>

              {favoriteCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? ' text-basicRed underline relative' : 'relative'
              }
              to="/cart"
            >
              <i className="fa-solid fa-cart-shopping hover:text-basicRed text-xl sm:text-2xl transition-all duration-300"></i>

              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </NavLink>
            <AccountMenu />
          </div>
          <ThemeSwitcher />
        </div>
      </div>

      {showSearchBar && (
        <div className="sm:hidden flex items-center justify-center py-2 sm:pt-0">
          <SearchBar />
        </div>
      )}

      {showMenu && (
        <div className="lg:hidden">
          <ul className="flex flex-col items-center gap-4 py-4  bg-gray-100 dark:bg-darkSecondary border-t dark:border-gray-700">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${linkStyles} ${isActive ? 'text-basicRed underline' : ''}`
                }
                to="/"
                onClick={toggleMenu}
              >
                {t('header.home')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${linkStyles} ${isActive ? 'text-basicRed underline' : ''}`
                }
                to="/contact"
                onClick={toggleMenu}
              >
                {t('header.contact')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${linkStyles} ${isActive ? 'text-basicRed underline' : ''}`
                }
                to="/about"
                onClick={toggleMenu}
              >
                {t('header.about')}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `${linkStyles} ${isActive ? 'text-basicRed underline' : ''}`
                }
                to="/sign"
                onClick={toggleMenu}
              >
                {t('header.signup')}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
