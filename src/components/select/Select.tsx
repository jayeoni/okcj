import { Listbox, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../common/Icon';

export interface SelectItem {
  id: number;
  label: string;
  value?: any;
}

export interface SelectProps {
  value: SelectItem | undefined;
  onChange: (value: SelectItem | undefined) => void;
  values: SelectItem[];
  placeholder: string;
  label?: string;
}

const Select = (props: SelectProps) => {
  const { onChange, value, values, placeholder, label } = props;
  return (
    <div className="space-y-[6px]">
      {label && <label className="p3 mb-0 text-gray-800">{label}</label>}
      <Listbox value={value} onChange={(item) => onChange(item)}>
        <Listbox.Button
          className={({ open }) =>
            twMerge(
              'group flex w-full max-w-[350px] flex-row items-center justify-between rounded-lg border border-slate-200 bg-white py-3 px-4 transition-all hover:border-slate-800',
              open && 'border-slate-800 text-slate-900'
            )
          }
        >
          {({ open }) => (
            <>
              <span
                className={twMerge(
                  'p2 text-slate-900 transition-all group-hover:text-slate-900',
                  !value && 'text-slate-400'
                )}
              >
                {value?.label || placeholder}
              </span>
              <motion.div
                variants={{
                  open: {
                    rotate: 0,
                    transition: {
                      duration: 0.2,
                    },
                  },
                  close: {
                    rotate: 180,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
                animate={open ? 'open' : 'close'}
              >
                <Icon.ChevronUp
                  className={twMerge(
                    'wh-4 text-slate-400 transition-all group-hover:text-slate-900',
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
              const selected = value?.id === item.id;
              return (
                <Listbox.Option
                  key={item.id}
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
                    <h6>{item.label}</h6>
                    {selected && <Icon.Check />}
                  </div>
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
export default Select;
