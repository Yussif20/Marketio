import { Link } from 'react-router-dom';

const CategoryCard = ({ title, icon }) => {
  return (
    <Link
      to={title}
      className="w-[170px] h-[145px] border border-gray-300 flex flex-col gap-6 items-center justify-center hover:bg-gray-100"
    >
      <i className={`${icon} fa-3x`}></i>
      <h3>{title}</h3>
    </Link>
  );
};

export default CategoryCard;
