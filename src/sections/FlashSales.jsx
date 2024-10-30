import Button from '../components/Button';
import Countdown from '../components/Countdown';
import CardSlider from '../components/CardSlider';
import Section from '../components/Section';
import ProductCard from '../components/ProductCard';

import { productsData } from '../data';

const FlashSales = () => {
  let colClasses = 'flex flex-col items-center';
  let dateIdentifierClasses = 'text-xs font-poppins font-medium';
  let dateCountClasses = 'font-bold text-[32px] leading-[30px]';

  return (
    <Section
      title="Today's"
      isMultiHeadline={true}
      headline={
        <div className="flex items-center gap-32 my-4">
          <h3 className="text-4xl font-semibold mt-4">Flash Sales</h3>
          <Countdown
            colClasses={colClasses}
            dateIdentifierClasses={dateIdentifierClasses}
            dateCountClasses={dateCountClasses}
            targetDate="2024-12-31T23:59:59"
          />
        </div>
      }
    >
      <CardSlider
        products={productsData}
        Card={ProductCard}
        spaceBetween={20}
        slidesPerView={4}
      />
      <div className="flex items-center justify-center">
        <Button variant="primary" size="md">
          View All Products
        </Button>
      </div>
    </Section>
  );
};

export default FlashSales;
