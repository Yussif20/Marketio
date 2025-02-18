import Button from '@components/Button';
import Countdown from '@components/Countdown';

import headphoneImage from '@assets/sale-count/headphones-lg.jpg';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../ProductContext';

const SaleCount = () => {
  let colClasses =
    'flex flex-col items-center justify-center rounded-full w-[62px] h-[62px] bg-white text-black';
  let dateIdentifierClasses = 'text-[11px] font-poppins order-2';
  let dateCountClasses = 'font-semibold order-1';

  const { t } = useTranslation();

  const { direction } = useProductContext();

  return (
    <section className="flex items-center justify-center py-8 md:py-16 relative">
      <img
        className="h-[500px] w-[1170px] "
        src={headphoneImage}
        alt="sale Image"
      />
      <div
        className={`z-10 absolute ${
          direction === 'ltr'
            ? 'left-10 sm:left-20 md:left-56'
            : 'right-10 sm:right-20 md:right-56'
        } top-10 sm:top-20  md:top-40 flex flex-col items-start`}
      >
        <h4 className="text-basicGreen font-poppins font-semibold order">
          {t('sections.saleCount.title')}
        </h4>
        <h3 className="text-white text-5xl font-semibold my-6">
          {t('sections.saleCount.text')}
          <br /> {t('sections.saleCount.textSecondLine')}
        </h3>
        <Countdown
          colClasses={colClasses}
          dateIdentifierClasses={dateIdentifierClasses}
          dateCountClasses={dateCountClasses}
          targetDate="2025-08-10T23:59:59"
          isSeparated={false}
        />
        <Button className="font-medium mt-7" variant="green">
          {t('buttons.buyNow')}
        </Button>
      </div>
    </section>
  );
};

export default SaleCount;
