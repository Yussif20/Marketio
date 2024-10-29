import Button from '../components/Button';
import CardSlider from '../components/CardSlider';
import ProductCard from '../components/ProductCard';
import Section from '../components/Section';
import { productsData } from '../data';

const Explore = () => {
  return (
    <Section title="Our Products" headline="Explore Our Products">
      <CardSlider
        products={productsData}
        Card={ProductCard}
        spaceBetween={20}
        slidesPerView={4}
      />
      <div className="flex items-center justify-center">
        <Button>View All Products</Button>
      </div>
    </Section>
  );
};
export default Explore;
