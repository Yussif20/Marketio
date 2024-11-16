import { Link } from 'react-router-dom';
import Button from '@components/Button';
import { useProductContext } from '../ProductContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignInButton from '../components/GoogleSignInButton';

const SignUp = () => {
  const { signUp } = useProductContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <h3 className="font-inter font-medium text-4xl">Create an account</h3>
      <p>Enter your details below</p>
      {/* <input
        className="outline-none p-2 border-b dark:bg-darkPrimary"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
      /> */}
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
      <Button onClick={handleSignUp} className="mt-6" size="lg">
        Create Account
      </Button>
      <GoogleSignInButton />
      <p className="flex items-center justify-center gap-4">
        Already have an account?{' '}
        <Link
          to="in"
          className="font-medium underline hover:no-underline transition-all duration-[300ms] ease-in-out"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
