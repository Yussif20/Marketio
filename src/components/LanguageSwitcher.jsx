import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const options = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'es', label: 'Spanish' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  return (
    <Select
      defaultValue={
        options.find((option) => option.value === i18n.language) || options[0]
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
      options={options}
    />
  );
};

export default LanguageSwitcher;
