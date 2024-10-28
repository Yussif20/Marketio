import CategoryCard from '../components/CategoryCard';
import CardSlider from '../components/CardSlider';
import Section from '../components/Section';
import { categories } from '../data';

const Categories = () => {
  return (
    <Section title="Categories" headline="Browse By Category">
      <CardSlider
        products={categories}
        Card={CategoryCard}
        spaceBetween={10}
        slidesPerView={6}
      />
    </Section>
  );
};

export default Categories;
