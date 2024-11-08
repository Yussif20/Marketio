import { useState, useRef, useEffect } from 'react';

const AccountMenu = () => {
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
        <i className="fa-regular fa-user hover:text-basicRed text-xl sm:text-2xl transition-all duration-300"></i>
      </button>

      {isOpen && (
        <div className="absolute right-[-40px] sm:right-0 mt-2 w-52 bg-white/35 dark:bg-white/10 backdrop-blur-lg shadow-lg rounded-md overflow-hidden z-10">
          <ul className="text-gray-700 dark:text-white">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex gap-2 items-center">
              <i className="fa-regular fa-user"></i>
              <span>Manage my account</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex gap-2 items-center">
              <i className="fa-solid fa-bag-shopping"></i>
              <span> My orders</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex gap-2 items-center">
              <i className="fa-regular fa-circle-xmark"></i>
              <span>My cancellations</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex gap-2 items-center">
              <i className="fa-regular fa-star"></i>
              <span> My reviews</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex gap-2 items-center text-red-600">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span> Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
