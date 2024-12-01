import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProductContext } from '../ProductContext';

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { direction } = useProductContext();

  const { t } = useTranslation();

  const categories = [
    t('aside.camera'),
    t('aside.phones'),
    t('aside.laptops'),
    t('aside.clothing'),
    t('aside.monitors'),
    t('aside.toys'),
    t('aside.accessories'),
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
