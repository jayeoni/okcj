import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Text?: React.ReactNode;
  helper?: string;
  disabled?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
  const { helper, Text, checked, disabled, onChange, ...rest } = props;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    checked !== undefined && setIsChecked(checked);
  }, [checked]);

  return (
    <AnimatePresence>
      <div className="flex flex-col space-y-[6px]">
        <label className="label flex flex-row items-center">
          <input
            {...rest}
            type="checkbox"
            className="peer disabled:bg-gray-200"
            disabled={disabled}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              onChange?.(e);
            }}
            checked={isChecked}
          />
          <motion.div
            initial={'unchecked'}
            variants={{
              checked: {
                backgroundColor: '#0F172A',
                borderColor: '#0F172A',
                transition: { duration: 0.3 },
              },
              unchecked: {
                backgroundColor: '#FFFFFF',
                borderColor: '#CBD5E1',
                transition: { duration: 0.3 },
              },
            }}
            animate={isChecked ? 'checked' : 'unchecked'}
            className={
              'mr-2 flex h-6 w-6 items-center justify-center rounded-sm border'
            }
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={isChecked ? 'checked' : 'unchecked'}
            >
              <motion.path
                variants={{
                  checked: {
                    pathLength: 1,
                    pathOffset: 0,
                    transition: { duration: 0.3 },
                  },
                  unchecked: {
                    pathLength: 1,
                    pathOffset: 1,
                    transition: { duration: 0.3 },
                  },
                }}
                d="M11.6663 3.5L5.24967 9.91667L2.33301 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
          {Text}
        </label>
        {helper && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="small-3 text-red-500"
          >
            {helper}
          </motion.p>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Checkbox;
