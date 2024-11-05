import { Link } from 'react-router-dom';

const categories = [
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  'Baby’s & Toys',
  'Groceries & Pets',
  'Health & Beauty',
];

const Aside = () => {
  return (
    <aside className="pt-8 w-[250px] border-r hidden md:block">
      <ul className="flex flex-col">
        <li className="relative group w-full py-2 px-12 dark:hover:bg-darkSecondary hover:bg-gray-200 cursor-pointer flex items-center justify-between ">
          Men’s Fashion
          <svg
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current text-black dark:text-white"
          >
            <path
              d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z"
              fill="black"
            />
          </svg>
          <ul className="absolute left-full top-0 hidden group-hover:flex flex-col dark:bg-darkPrimary shadow-lg border border-gray-200 dark:border-darkSecondary border-l-0 ">
            <li className="py-2 px-4 dark:hover:bg-darkSecondary hover:bg-gray-200 border-b border-gray-200 dark:border-darkSecondary">
              <Link to="shirts">Shirts</Link>
            </li>
            <li className="py-3 px-6 dark:hover:bg-darkSecondary hover:bg-gray-200">
              <Link to="jeans">Jeans</Link>
            </li>
          </ul>
        </li>
        {categories.map((category) => {
          return (
            <li
              key={category}
              className="w-full py-2 px-12 dark:hover:bg-darkSecondary hover:bg-gray-200"
            >
              <Link to={category}>{category}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Aside;
