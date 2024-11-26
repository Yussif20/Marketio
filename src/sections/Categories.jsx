import Section from '@components/Section';
import CategorySlider from '@components/CategorySlider';
import { useTranslation } from 'react-i18next';

const Categories = () => {
  const { t } = useTranslation();
  const categories = t('sections.categories.data', { returnObjects: true });
  return (
    <Section
      title={t('sections.categories.headline')}
      headline={t('sections.categories.title')}
    >
      <CategorySlider
        products={categories}
        spaceBetween={10}
        slidesPerView={6}
      />
    </Section>
  );
};

export default Categories;
