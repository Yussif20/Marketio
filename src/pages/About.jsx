import { Link } from 'react-router-dom';

import Statics from '@components/Statics';

import aboutImg from '@assets/about/about.jpeg';
import Founders from '@components/Founders';
import Services from '@components/Services';
import { useTranslation } from 'react-i18next';
import { useProductContext } from './../ProductContext';

export const About = () => {
  const { t } = useTranslation();
  const { direction } = useProductContext(); // Access the direction state (e.g., "ltr" or "rtl")

  return (
    <section
      className={`mx-12 dark:bg-darkPrimary dark:text-white ${
        direction === 'rtl' ? 'text-right' : 'text-left'
      }`}
    >
      <h5 className="py-10 font-poppins">
        <Link className="text-gray-400" to="/">
          {t('pages.about.breadcrumbs.home')} /{' '}
        </Link>
        <span> {t('pages.about.breadcrumbs.about')}</span>
      </h5>
      <div
        className={`flex items-center text-center ${
          direction === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } flex-col gap-6`}
      >
        <div
          className={`flex flex-col gap-6 ${
            direction === 'rtl' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'
          }`}
        >
          <h2 className="font-semibold text-[54px]">
            {t('pages.about.title')}
          </h2>
          <p>{t('pages.about.textFirst')}</p>
          <p>{t('pages.about.textSecond')} </p>
        </div>
        <img
          className={`rounded-md ${
            direction === 'rtl' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'
          } lg:w-[700px] lg:h-[600px] md:w-[550px] md:[440px]`}
          src={aboutImg}
          alt="About us"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-16">
        <Statics />
        <Founders />
        <Services />
      </div>
    </section>
  );
};
