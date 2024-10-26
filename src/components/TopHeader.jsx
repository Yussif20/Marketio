const TopHeader = () => {
  return (
    <div className="w-full bg-black h-12 flex items-center justify-center">
      <div className="text-sm text-white leading-5 font-poppins flex gap-2">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        <button className="font-semibold underline hover:no-underline hover:text-gray-300 transition-all duration-[300ms] ease-in-out">
          ShopNow
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
