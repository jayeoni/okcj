import { AnimatePresence, motion } from 'framer-motion';
import { ForwardedRef, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../common/Icon';

export interface ModalTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  isSuccess?: boolean;
}

const ModalTextField = (
  props: ModalTextFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) => {
  const { className, label, helper, disabled, isSuccess, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <AnimatePresence>
      <div className="flex w-full flex-col space-y-[6px]">
        {label && (
          <label className="label font-extrabold text-brand-1">{label}</label>
        )}
        <div
          className={twMerge(
            'relative flex w-full flex-row items-center border-b transition-all hover:border-brand-1',
            helper && 'border-red-500 hover:border-red-500',
            !helper && isFocused && 'border-slate-900',
            !helper && !isFocused && 'border-slate-200',
            disabled &&
              'border-slate-200 bg-slate-100 text-slate-400 hover:border-slate-200',
            isSuccess && 'border-green-500 pr-4 hover:border-green-500',
            className
          )}
        >
          <input
            {...rest}
            disabled={disabled}
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={twMerge(
              'h-full w-full rounded-lg px-2 py-1 text-slate-900 placeholder:text-[#90E0C2] disabled:text-slate-500'
            )}
          />
          {isSuccess && (
            <Icon.Check className="absolute right-4 text-green-500" />
          )}
        </div>
        {helper && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="helper-error"
          >
            {helper}
          </motion.p>
        )}
      </div>
    </AnimatePresence>
  );
};

export default forwardRef(ModalTextField);
