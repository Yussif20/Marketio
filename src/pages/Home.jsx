import BestSelling from '../sections/BestSelling';
import Categories from '../sections/Categories';
import FlashSales from '../sections/FlashSales';
import Hero from '../sections/Hero';
import SaleCount from '../sections/SaleCount';

const Home = () => {
  return (
    <main>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
      <SaleCount />
    </main>
  );
};

export default Home;
