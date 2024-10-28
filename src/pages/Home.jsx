import BestSelling from '../sections/BestSelling';
import Categories from '../sections/Categories';
import FlashSales from '../sections/FlashSales';
import Hero from '../sections/Hero';

const Home = () => {
  return (
    <main>
      <Hero />
      <FlashSales />
      <Categories />
      <BestSelling />
    </main>
  );
};

export default Home;
