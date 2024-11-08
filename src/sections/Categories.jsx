import Section from '@components/Section';
import CategorySlider from '@components/CategorySlider';
import { categories } from '../data';

const Categories = () => {
  return (
    <Section title="Categories" headline="Browse By Category">
      <CategorySlider
        products={categories}
        spaceBetween={10}
        slidesPerView={6}
      />
    </Section>
  );
};

export default Categories;
