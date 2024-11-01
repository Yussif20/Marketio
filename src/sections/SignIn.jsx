import Button from '../components/Button';

const SignIn = () => {
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
        name="email"
        id="email"
        placeholder="Email or Phone Number"
      />
      <input
        className="outline-none p-2 border-b dark:bg-darkPrimary"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <div className="flex items-center justify-between mt-6">
        <Button size="sm">Log in</Button>
        <button className="text-basicRed hover:text-red-500">
          Forget Password?
        </button>
      </div>
    </div>
  );
};

export default SignIn;
