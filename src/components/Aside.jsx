import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { direction } = useProductContext();

  const { t } = useTranslation();

  const categories = [
    t('aside.womenFashion'),
    t('aside.electronics'),
    t('aside.homeAppliances'),
    t('aside.beautyAndPersonalCare'),
    t('aside.sportsOutdoors'),
  ];

  return (
    <>
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-gray-500 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i
          className={`fa-solid text-xl sm:text-2xl  ${
            isOpen ? 'fa-times' : 'fa-bars'
          }`}
        ></i>
      </button>
      <aside
        className={`fixed top-0 ${
          direction === 'ltr' ? 'border-r' : 'border-l'
        } 
        left-0 h-full bg-white pt-8 w-[250px] z-40 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex md:w-[250px] dark:bg-darkPrimary`}
      >
        <ul className="flex flex-col">
          <li className="relative group w-full py-2 px-12 dark:hover:bg-darkSecondary hover:bg-gray-200 cursor-pointer flex items-center justify-between">
            {t('aside.menFashion')}
            <i className="fa-solid fa-chevron-right"></i>
            <ul
              className={`absolute top-0 ${
                direction === 'ltr'
                  ? 'left-full border-l-0'
                  : 'right-full border-r-0'
              } hidden group-hover:flex flex-col bg-white dark:bg-darkPrimary shadow-lg border border-gray-200 dark:border-darkSecondary`}
            >
              <li className="py-2 px-4 dark:hover:bg-darkSecondary hover:bg-gray-200 border-b border-gray-200 dark:border-darkSecondary">
                <Link to="shirts">{t('aside.shirts')}</Link>
              </li>
              <li className="py-3 px-6 dark:hover:bg-darkSecondary hover:bg-gray-200">
                <Link to="jeans">{t('aside.jeans')}</Link>
              </li>
            </ul>
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className="w-full py-2 px-12 dark:hover:bg-darkSecondary hover:bg-gray-200"
            >
              <Link to={category}>{category}</Link>
            </li>
          ))}
        </ul>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Aside;
