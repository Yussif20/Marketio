import { Link } from 'react-router-dom';
import Button from '@components/Button';
import { useProductContext } from '../ProductContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { logIn } = useProductContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      alert('Log in successfully!');
      navigate('/');
    } catch (error) {
      alert('Error logging in');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-inter font-medium text-4xl">
        Log in to{' '}
        <span className="font-semibold">
          MAR<span className="text-basicRed">KET</span>IO
        </span>
      </h3>
      <p>Enter your details below</p>
      <input
        className="outline-none p-2 border-b dark:bg-darkPrimary"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="outline-none p-2 border-b dark:bg-darkPrimary"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div className="flex items-center justify-between mt-6">
        <Button onClick={handleLogIn} size="sm">
          Log in
        </Button>
        <button className="text-basicRed hover:text-red-500">
          Forget Password?
        </button>
      </div>
      <p className="mt-6 text-gray-500">
        Don&apos;t have an account?{' '}
        <Link to="../" className="text-basicRed">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
