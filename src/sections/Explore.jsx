import Button from '@components/Button';

import ExploreSlider from '@components/ExploreSlider';
import Section from '@components/Section';
import { useTranslation } from 'react-i18next';

const Explore = () => {
  const { t } = useTranslation();
  return (
    <Section
      title={t('sections.explore.headline')}
      headline={t('sections.explore.title')}
    >
      <ExploreSlider />
      <div className="flex items-center justify-center">
        <Button>{t('buttons.viewAll')}</Button>
      </div>
    </Section>
  );
};
export default Explore;
