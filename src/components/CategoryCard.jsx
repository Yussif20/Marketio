const CategoryCard = ({ title, icon }) => {
  return (
    <div className="w-[170px] h-[145px] border">
      <i className={icon}></i>
      <h3>{title}</h3>
    </div>
  );
};

export default CategoryCard;
