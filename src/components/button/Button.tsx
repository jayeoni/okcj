import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

export enum ButtonVariant {
  SOLID = 'solid',
  OUTLINE = 'outline',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: ButtonVariant;
  to?: string;
  icon?: ReactElement;
}

export const Button: FC<ButtonProps> = ({
  children,
  className = '',
  text,
  to,
  icon,
  variant = ButtonVariant.SOLID,
  onClick,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      className={twMerge(
        'button flex items-center justify-center p-5 font-extrabold shadow',
        // icon && 'flex items-center justify-between'
        variant === ButtonVariant.SOLID && 'bg-brand-1 text-white',
        variant === ButtonVariant.OUTLINE && 'text-brand-1',
        className
      )}
      onClick={to ? () => router.push(to) : onClick}
      {...props}
    >
      <div>{text ?? children}</div>
      {icon}
    </button>
  );
};
