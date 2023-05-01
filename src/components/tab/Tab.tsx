import { AnimateSharedLayout, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
export interface TabProps {
  children: React.ReactNode;
  className?: string;
}
export interface TabItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const Tab = ({ className, children }: TabProps) => {
  return (
    <div className={twMerge('flex flex-row items-center', className)}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </div>
  );
};

const TabItem = (props: TabItemProps) => {
  const { text, selected, onClick, className } = props;
  return (
    <motion.button
      onClick={onClick}
      className={twMerge(
        'relative flex flex-col pb-2 shadow-[2px_0_60px_-15px_rgba(0,0,0,0.3)]',
        !selected && 'opacity-50',
        className
      )}
      animate={{ color: selected ? '#00D282' : '#94A3B8' }}
      whileHover={{ color: '#181818' }}
    >
      {text}
      {selected && (
        <motion.div
          className="absolute right-0 bottom-1 left-0 m-auto h-[2px] w-3/4 rounded bg-brand-1 stroke-2"
          layoutId="underline"
        />
      )}
    </motion.button>
  );
};

Tab.Item = TabItem;

export { Tab };
