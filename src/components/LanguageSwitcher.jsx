import { useContext } from 'react';
import Select from 'react-select';
import { AppContext } from '../AppContext';

const options = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'es', label: 'Spanish' },
];

const LanguageSwitcher = () => {
  const { setLang, lang } = useContext(AppContext);

  const languageChangeHandler = (e) => {
    setLang(e.value);
    console.log(lang);
  };
  return (
    <Select
      defaultValue={options[0]}
      onChange={languageChangeHandler}
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
