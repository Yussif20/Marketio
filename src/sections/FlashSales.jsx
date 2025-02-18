import Button from '@components/Button';
import Countdown from '@components/Countdown';
import ProductSlider from '@components/ProductSlider';
import Section from '@components/Section';
import { useTranslation } from 'react-i18next';

const FlashSales = () => {
  let colClasses = 'flex flex-col items-center';
  let dateIdentifierClasses = 'text-xs font-poppins font-medium';
  let dateCountClasses = 'font-bold text-[32px] leading-[30px]';

  const { t } = useTranslation();

  return (
    <Section
      title={t('sections.flashSales.headline')}
      isMultiHeadline={true}
      headline={
        <div className="flex flex-col gap-6 sm:flex-row items-center sm:gap-32">
          <h3 className="text-4xl font-semibold">
            {t('sections.flashSales.title')}
          </h3>
          <Countdown
            colClasses={colClasses}
            dateIdentifierClasses={dateIdentifierClasses}
            dateCountClasses={dateCountClasses}
            targetDate="2025-10-10T23:59:59"
          />
        </div>
      }
    >
      <div>
        <ProductSlider spaceBetween={20} slidesPerView={4} />
      </div>
      <div className="flex items-center justify-center">
        <Button variant="primary" size="md">
          {t('buttons.viewAll')}
        </Button>
      </div>
    </Section>
  );
};

export default FlashSales;
