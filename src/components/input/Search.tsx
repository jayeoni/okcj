import { AnimatePresence, motion } from 'framer-motion';
import React, { ForwardedRef, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../common/Icon';

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
  value?: string;
}

const Search = (props: SearchProps, ref?: ForwardedRef<HTMLInputElement>) => {
  const { className, disabled, value, onChange, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="mt-32 px-5">
      <motion.div
        className={twMerge(
          'relative flex w-full items-center overflow-hidden border-b-2 border-brand-1 opacity-100 transition-all hover:stroke-2',
          isFocused && 'stroke-2',
          !isFocused && '',
          disabled &&
            'border-gray-200 bg-gray-100 text-gray-400 hover:border-gray-200',
          className
        )}
      >
        <input
          placeholder="검색어를 입력해주세요."
          {...rest}
          disabled={disabled}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={twMerge('w-full py-3 px-5', className)}
          value={value}
        />
        <Icon.Search className="absolute right-4 items-center stroke-brand-1" />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => onChange('')}
              className="wh-5 absolute right-4 top-4 text-gray-400"
            >
              <Icon.X />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default forwardRef(Search);
