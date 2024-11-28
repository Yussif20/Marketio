import Section from '@components/Section';
import Services from '@components/Services';

import playstationImg from '@assets/featured/playstation.png';
import speakersImg from '@assets/featured/speakers.png';
import perfumeImg from '@assets/featured/perfume.png';
import glassesImg from '@assets/featured/glasses.png';
import { useTranslation } from 'react-i18next';
import { useProductContext } from '../ProductContext';

const Featured = () => {
  const { t } = useTranslation();

  const { direction } = useProductContext();
  return (
    <Section
      title={t('sections.featured.headline')}
      headline={t('sections.featured.title')}
    >
      <div className="flex items-center justify-evenly gap-4 my-12 flex-wrap">
        <div className="relative h-[600px] w-[350px] sm:w-[570px] rounded bg-black flex items-center justify-center ">
          <img
            className="hover:scale-105 transition-transform "
            src={playstationImg}
            alt="playstation"
          />
          <div
            className={`absolute bottom-20 ${
              direction === 'ltr' ? 'left-8' : 'right-8'
            } flex flex-col items-start gap-4 text-white`}
          >
            <h3 className="text-2xl">
              {t('sections.featured.playstation.title')}
            </h3>
            <p className="text-sm font-poppins">
              {t('sections.featured.playstation.description')}
            </p>
            <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
              {t('buttons.shopNow')}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center relative h-[284px] w-[300px] sm:w-[570px] rounded bg-black max-w-full">
            <img
              className="hover:scale-105 transition-transform max-w-[300px]"
              src={glassesImg}
              alt="speakers"
            />
            <div
              className={`absolute bottom-12 ${
                direction === 'ltr' ? 'left-8' : 'right-8'
              } flex flex-col items-start gap-4 text-white`}
            >
              <h3 className="text-2xl">
                {' '}
                {t('sections.featured.womenCollection.title')}
              </h3>
              <p className="text-sm font-poppins">
                {t('sections.featured.womenCollection.description')}
              </p>
              <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                {t('buttons.shopNow')}
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative h-[284px] w-[270px] rounded bg-black flex items-center justify-center">
              <img
                className="hover:scale-105 transition-transform"
                src={speakersImg}
                alt="speakers"
              />
              <div
                className={`absolute bottom-12 ${
                  direction === 'ltr' ? 'left-8' : 'right-8'
                } flex flex-col items-start gap-3 text-white`}
              >
                <h3 className="text-2xl">
                  {t('sections.featured.speakers.title')}
                </h3>
                <p className="text-sm font-poppins">
                  {t('sections.featured.speakers.description')}
                </p>
                <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                  {t('buttons.shopNow')}
                </button>
              </div>
            </div>
            <div className="relative h-[284px] w-[270px] rounded bg-black flex items-center justify-center">
              <img
                className="hover:scale-105 transition-transform "
                src={perfumeImg}
                alt="perfume"
              />

              <div
                className={`absolute bottom-12 ${
                  direction === 'ltr' ? 'left-8' : 'right-8'
                } flex flex-col items-start gap-3 text-white`}
              >
                <h3 className="text-2xl">
                  {t('sections.featured.perfume.title')}
                </h3>
                <p className="text-sm font-poppins">
                  {t('sections.featured.perfume.description')}
                </p>
                <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
                  {t('buttons.shopNow')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <Services />
      </div>
    </Section>
  );
};

export default Featured;
