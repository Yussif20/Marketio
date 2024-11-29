import { Link } from 'react-router-dom';
import Button from '@components/Button';
import { useProductContext } from '../ProductContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useTranslation } from 'react-i18next';

export const SignUp = () => {
  const { signUp } = useProductContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      alert('Signed up successfully!');
      navigate('/');
    } catch (error) {
      alert('Error signing up');
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-inter font-medium text-4xl">
        {t('pages.sign.signUp.title')}
      </h3>
      <p>{t('pages.sign.signUp.text')}</p>
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
      <Button onClick={handleSignUp} className="mt-6" size="lg">
        {t('buttons.createAccount')}
      </Button>
      <GoogleSignInButton />
      <p className="flex items-center justify-center gap-4">
        {t('pages.sign.signUp.haveAccount')}{' '}
        <Link
          to="in"
          className="font-medium underline hover:no-underline transition-all duration-[300ms] ease-in-out"
        >
          {t('pages.sign.signUp.logIn')}
        </Link>
      </p>
    </div>
  );
};
