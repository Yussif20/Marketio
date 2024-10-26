import LanguageSwitcher from './LanguageSwitcher';

const TopHeader = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-1 h-13 flex gap-4 items-center justify-center dark:bg-gray-300 dark:text-gray-900">
      <div className="text-sm leading-5 font-poppins flex gap-2">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
          ShopNow
        </button>
      </div>
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default TopHeader;
