import { useEffect } from 'react';
import { firework } from '../utils/firework'; // Adjust the import path based on your file structure
import { Link } from 'react-router-dom';

import Button from '@components/Button';
import { useTranslation } from 'react-i18next';

const SuccessPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    firework();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-darkPrimary text-darkPrimary dark:text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        {t('pages.successPage.title')}
      </h1>
      <p className="text-lg mb-6">{t('pages.successPage.text')}</p>
      <div className="flex gap-4">
        <Button>
          <Link to="/">{t('buttons.goToHomePage')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
