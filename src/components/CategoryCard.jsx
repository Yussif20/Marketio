import { Link } from 'react-router-dom';

const CategoryCard = ({ title, value, icon, ...props }) => {
  const { setSelectedCategory } = props;
  return (
    <Link
      {...props}
      to="categories"
      onClick={() => {
        console.log(value);
        setSelectedCategory(value);
      }}
      className="w-full max-w-[170px] h-[145px] border border-gray-300 flex flex-col gap-6 items-center justify-center bg-white hover:bg-basicRed hover:text-white dark:bg-darkPrimary dark:hover:bg-basicRed shadow-sm transition-all duration-300"
    >
      <i className={`${icon} fa-3x`}></i>
      <h3>{title}</h3>
    </Link>
  );
};

export default CategoryCard;
