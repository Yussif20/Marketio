import Section from '@components/Section';
import CategorySlider from '@components/CategorySlider';
import { useTranslation } from 'react-i18next';

const Categories = () => {
  const { t } = useTranslation();
  return (
    <Section
      title={t('sections.categories.headline')}
      headline={t('sections.categories.title')}
    >
      <CategorySlider spaceBetween={10} slidesPerView={6} />
    </Section>
  );
};

export default Categories;
