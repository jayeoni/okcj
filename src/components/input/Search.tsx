import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../common/Icon';

export interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
const SearchField = (props: SearchProps) => {
  const { className, value, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="mt-16">
      <div
        className={twMerge(
          'relative flex w-full items-center overflow-hidden border-b-2 border-brand-1 opacity-100 transition-all hover:stroke-2',
          isFocused && 'stroke-2',
          !isFocused && '',
          className
        )}
      >
        <input
          {...rest}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge('w-full rounded-lg py-3 px-5', className)}
        />
        <AnimatePresence>
          {value ? (
            <motion.div
              key="xcircle-icon"
              className="wh-5 absolute right-4 flex items-center justify-center"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
            >
              <Icon.X />
            </motion.div>
          ) : (
            <motion.div
              key="search-icon"
              className="wh-5 absolute right-4 flex items-center justify-center"
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
            >
              <Icon.Search />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchField;
