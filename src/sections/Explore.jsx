import Button from '@components/Button';

import ExploreSlider from '@components/ExploreSlider';
import Section from '@components/Section';
import { productsData } from '../data';

const Explore = () => {
  return (
    <Section title="Our Products" headline="Explore Our Products">
      <ExploreSlider products={productsData} />
      <div className="flex items-center justify-center">
        <Button>View All Products</Button>
      </div>
    </Section>
  );
};
export default Explore;
