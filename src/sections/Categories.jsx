import CategoryCard from '../components/CategoryCard';
import ProductSlider from '../components/CardSlider';
import Section from '../components/Section';
import { categories } from '../data';

const Categories = () => {
  return (
    <Section title="Categories" headline="Browse By Category">
      <ProductSlider products={categories} Card={CategoryCard} />
    </Section>
  );
};

export default Categories;
