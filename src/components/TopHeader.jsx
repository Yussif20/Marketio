import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const TopHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-gray-900 text-white py-1 sm:h-13 flex flex-col md:flex-row gap-1 md:gap-4 items-center justify-center dark:bg-gray-300 dark:text-gray-900">
      <p className="text-center sm:text-left text-xs sm:text-sm sm:leading-5">
        {t('topHeader.text')}
      </p>
      <div className="text-sm font-poppins flex items-center justify-evenly gap-2">
        <button className="font-semibold underline hover:no-underline transition-all duration-[300ms] ease-in-out">
          {t('topHeader.button')}
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default TopHeader;
