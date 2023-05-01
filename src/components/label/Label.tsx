import { FC, LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  text?: string;
  compulsory?: boolean;
}

export const Label: FC<LabelProps> = ({
  children,
  compulsory,
  className = '',
  text,
  ...props
}) => {
  return (
    <label
      className={`label rounded-full py-1 px-2 text-sm font-bold text-white ${className} ${
        compulsory && `after:ml-0.5 after:text-red-400 after:content-['*']`
      }`}
      {...props}
    >
      {text ?? children}
    </label>
  );
};
