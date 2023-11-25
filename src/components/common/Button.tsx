import { ButtonHTMLAttributes } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  blacked?: boolean;
}

export const Button = ({ children, blacked = false, ...rest }: IProps) => {
  return (
    <button
      {...rest}
      className={`text-xs text-blue-500 font-semibold ${
        blacked ? 'text-black' : 'text-blue-500'
      }`}
    >
      {children}
    </button>
  );
};
