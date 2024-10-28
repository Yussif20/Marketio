import Button from '../components/Button';
import Countdown from '../components/Countdown';
import ProductSlider from '../components/ProductSlider';
import Section from '../components/Section';

import { productsData } from '../data';

const FlashSales = () => {
  return (
    <Section
      title="Today's"
      headline={
        <div className="flex items-center gap-32">
          <p>Flash Sales</p>
          <Countdown targetDate="2024-12-31T23:59:59" />
        </div>
      }
    >
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
