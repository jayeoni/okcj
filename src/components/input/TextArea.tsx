import { AnimatePresence, motion } from 'framer-motion';
import {
  ForwardedRef,
  forwardRef,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helper?: string;
}

const TextArea = (
  props: TextAreaProps,
  ref?: ForwardedRef<HTMLTextAreaElement>
) => {
  const { className, label, helper, disabled, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <AnimatePresence>
      <div className="label-col">
        {label && <label className="label">{label}</label>}

        <textarea
          {...rest}
          disabled={disabled}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={twMerge(
            'h-24 rounded-lg border hover:border-slate-300 focus:ring-0',
            helper && 'border-red-500 hover:border-red-500',
            !helper && isFocused && 'border-slate-200',
            !helper && !isFocused && 'border-slate-50',
            disabled &&
              'border-slate-200 bg-slate-100 text-slate-400 hover:border-slate-200',
            className
          )}
        />

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

TextArea.displayName = 'TextArea';
export default forwardRef(TextArea);
