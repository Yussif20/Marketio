import { useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [refreshKey, setRefreshKey] = useState(0);

  const languageOptions = t('languageOptions', { returnObjects: true });

  const handleChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value).then(() => {
      setRefreshKey((prevKey) => prevKey + 1);
    });
  };

  return (
    <Select
      key={refreshKey}
      defaultValue={
        languageOptions.find((option) => option.value === i18n.language) ||
        languageOptions[0]
      }
      onChange={handleChange}
      classNames={{
        indicatorSeparator: () => 'hidden',
        input: () => 'dark:text-gray-100',
        singleValue: () => 'dark:text-gray-800',
        option: () => 'hover:!text-gray-800',
        menu: () =>
          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
        control: () =>
          'flex items-center justify-between rounded-md border-none pl-2 pr-1 shadow',
      }}
      options={languageOptions}
    />
  );
};

export default LanguageSwitcher;
