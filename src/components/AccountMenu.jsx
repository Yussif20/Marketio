import { useState, useRef, useEffect } from 'react';
import { useProductContext } from '../ProductContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AccountMenu = () => {
  const { logOut, currentUser } = useProductContext();

  const { t } = useTranslation();

  const handleLogOut = async () => {
    try {
      await logOut();
      alert('Logged out successfully');
      setIsOpen(false);
    } catch (error) {
      alert('Error logging out');
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={toggleMenu} className="focus:outline-none">
        <i
          className={`fa-regular fa-user text-xl sm:text-2xl transition-all duration-300 ${
            currentUser ? 'text-basicRed ' : 'hover:text-basicRed'
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute right-[-40px] sm:right-0 mt-2 w-52 bg-white/35 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-md overflow-hidden z-10">
          <ul className="text-gray-700 dark:text-white">
            {currentUser ? (
              <>
                <li className="px-4 py-2 hover:bg-gray-10">
                  {t('header.accountMenu.welcome')},{' '}
                  <span className="text-basicRed font-semibold">
                    {currentUser.email.charAt(0).toUpperCase() +
                      currentUser.email.split('@')[0].slice(1)}
                  </span>
                </li>
                <li
                  onClick={handleLogOut}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex gap-2 items-center text-red-600"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span>{t('header.accountMenu.logOut')}</span>
                </li>
              </>
            ) : (
              <>
                <Link
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsOpen(false)}
                  to="sign"
                >
                  <li className="flex gap-2 items-center">
                    <i className="fa-regular fa-user"></i>
                    <span>{t('header.accountMenu.join')}</span>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
