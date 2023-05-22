import { AnimateSharedLayout, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
export interface PolicyTabProps {
  children: React.ReactNode;
  className?: string;
}
export interface PolicyTabItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

const PolicyTab = ({ className, children }: PolicyTabProps) => {
  return (
    <div className={twMerge('flex flex-row items-center', className)}>
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </div>
  );
};

const PolicyTabItem = (props: PolicyTabItemProps) => {
  const { text, selected, onClick, className } = props;
  return (
    <motion.button
      onClick={onClick}
      className={twMerge(
        'relative flex flex-col items-center py-3 font-extrabold drop-shadow-[5px_-12px_10px_rgba(0,0,0,0.1)]',
        !selected && 'opacity-50',
        className
      )}
      animate={{ color: '#00D282' }}
    >
      {text}
      {selected && (
        <motion.div
          className="absolute right-0 bottom-1 left-0 m-auto h-[2px] w-3/5 bg-brand-1 stroke-2 pt-1"
          layoutId="underline"
        />
      )}
    </motion.button>
  );
};

PolicyTab.Item = PolicyTabItem;

export { PolicyTab };
