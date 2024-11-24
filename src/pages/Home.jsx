import BestSelling from '@sections/BestSelling';
import Categories from '@sections/Categories';
import Explore from '@sections/Explore';
import Featured from '@sections/Featured';
import FlashSales from '@sections/FlashSales';
import Hero from '@sections/Hero';
import SaleCount from '@sections/SaleCount';

export const Home = () => {
  return (
    <>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <SaleCount />
      <Explore />
      <Featured />
    </>
  );
};
