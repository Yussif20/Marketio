// components/button.ts
import { cva } from 'class-variance-authority';

const button = cva('px-6 duration-200 font-poppins leading-6 rounded h-12', {
  variants: {
    variant: {
      primary: 'text-white bg-basicRed hover:bg-red-500',
      secondary: 'bg-white border border-black',
      destructive: 'text-basicRed bg-white border border-basicRed',
    },
    size: {
      sm: 'w-[142px]',
      md: 'w-[234px]',
      lg: 'w-[370px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const Button = ({
  children,
  variant,
  size,

  className,

  ...props
}) => {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};
export default Button;
