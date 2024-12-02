import { Link } from 'react-router-dom';
import Button from '@components/Button';
import { useProductContext } from '../ProductContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SignIn = () => {
  const { logIn } = useProductContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      alert('Logged in successfully!');
      navigate('/');
    } catch (error) {
      alert('Error logging in');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center sm:items-start sm:justify-start">
      <h3 className="font-inter font-medium text-4xl">
        {t('pages.sign.login.title')}{' '}
        <span className="font-semibold">
          {t('header.logoFirst')}
          <span className="text-basicRed"> {t('header.logoColored')}</span>
          {t('header.logoSecond')}
        </span>
      </h3>
      <p>{t('pages.sign.login.text')}</p>
      <input
        className="outline-none p-2 border-b dark:bg-darkPrimary"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('pages.sign.inputPlaceholder.email')}
      />
      <input
        className="outline-none p-2 border-b dark:bg-darkPrimary"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('pages.sign.inputPlaceholder.password')}
      />
      <div className="flex items-center justify-between gap-4 mt-6">
        <Button onClick={handleLogIn} size="sm">
          {t('buttons.logIn')}
        </Button>
        <button className="text-basicRed hover:text-red-500">
          {t('buttons.forgetPassword')}
        </button>
      </div>
      <p className="mt-6 text-gray-500">
        {t('pages.sign.login.haveAccount')}{' '}
        <Link to="../" className="text-basicRed">
          {t('pages.sign.login.signUp')}
        </Link>
      </p>
    </div>
  );
};
