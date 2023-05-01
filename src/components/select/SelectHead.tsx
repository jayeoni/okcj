import { Listbox, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { HEAD_TYPE_KOREAN, HeadType } from 'src/constants/head';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../../components/common/Icon';

export interface SelectHeadTypeProps {
  value?: HeadType | null;
  onChange: (value: HeadType | null) => void;
  values: HeadType[];
  placeholder: string;
  label?: string;
  helper?: string;
}

const SelectHeadType = (props: SelectHeadTypeProps) => {
  const { onChange, value, values, placeholder, label, helper } = props;
  const selected = values.find((item) => item === value);
  return (
    <div className="space-y-[6px]">
      {label && <label className="body-2 mb-0 text-gray-800">{label}</label>}
      <Listbox
        value={selected || null}
        onChange={(item) => {
          onChange(item);
        }}
      >
        <Listbox.Button
          className={({ open }) =>
            twMerge(
              'group flex h-12 w-full max-w-[450px] flex-row items-center justify-between rounded-lg border-2 border-brand-1 bg-white px-4 transition-all hover:border-brand-1',
              open && 'border-brand-1 text-slate-900',
              helper && 'border-red-500 hover:border-red-500'
            )
          }
        >
          {({ open }) => (
            <>
              <h5
                className={twMerge(
                  'text-brand-1 transition-all',
                  !value && 'text-slate-400'
                )}
              >
                {selected ? HEAD_TYPE_KOREAN[selected] : placeholder}
              </h5>
              <motion.div
                variants={{
                  open: {
                    rotate: 180,
                    transition: {
                      duration: 0.2,
                    },
                  },
                  close: {
                    rotate: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                animate={open ? 'open' : 'close'}
              >
                <Icon.ChevronDown
                  className={twMerge(
                    'stroke-brand-1 transition-all group-hover:text-slate-900',
                    open && 'text-slate-900'
                  )}
                />
              </motion.div>
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transform transition duration-[350ms]"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transform transition duration-[350ms]"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-50"
        >
          <Listbox.Options
            className={
              'absolute z-10 mt-[6px] flex w-full max-w-[350px] flex-col rounded-lg border border-slate-200 bg-white py-3'
            }
          >
            {values.map((item) => {
              const isSelected = selected === item;
              return (
                <Listbox.Option
                  key={item}
                  value={item}
                  className={({ active }) =>
                    twMerge(
                      'w-full cursor-pointer px-4 py-[6px] transition-all',
                      active && 'bg-slate-50'
                    )
                  }
                >
                  <div
                    className={twMerge(
                      'flex flex-row items-center justify-between',
                      selected ? 'text-slate-900' : 'text-slate-500'
                    )}
                  >
                    <h5>{HEAD_TYPE_KOREAN[item]}</h5>
                    {isSelected && <Icon.Check />}
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
      {helper && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="small-text-2 text-red-500"
        >
          {helper}
        </motion.p>
      )}
    </div>
  );
};
export default SelectHeadType;
