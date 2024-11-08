import LanguageSwitcher from './LanguageSwitcher';

const TopHeader = () => {
  return (
    <div className="w-full bg-gray-900 text-white py-1 sm:h-13 flex flex-col md:flex-row gap-1 md:gap-4 items-center justify-center dark:bg-gray-300 dark:text-gray-900">
      <p className="text-center sm:text-left text-xs sm:text-sm sm:leading-5">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
      </p>
      <div className="text-sm font-poppins flex items-center justify-evenly gap-2">
        <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
          ShopNow
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default TopHeader;
