import Button from '../components/Button';
import ProductSlider from '../components/ProductSlider';
import Section from '../components/Section';

import { productsData } from '../data';

const FlashSales = () => {
  return (
    <Section title="Today's" headline="Flash Sales">
      <ProductSlider products={productsData} />
      <div className="flex items-center justify-center">
        <Button variant="primary" size="md">
          View All Products
        </Button>
      </div>
    </Section>
  );
};

export default FlashSales;
