import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { DOC_DOWNLOAD, TAB_DATA } from 'src/dummies';

import { Icon } from '../common/Icon';
import DocLinkList from '../list/DocLinkList';
import { Tab } from '../tab/Tab';
import { AnimationLayout } from './AnimationLayout';

interface AppendixModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  email: string;
  password: string;
  name: string;
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const AppendixModal: FC<AppendixModalProps> = ({ open, onClose }) => {
  const swipeConfidenceThreshold = 10000;
  const [[page, direction], setPage] = useState([0, 0]);
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };
  const paginate = (newDirection: number) => {
    const newIndex = page + newDirection;
    if (newIndex >= 0 && newIndex < TAB_DATA.length) {
      setPage([newIndex, newDirection]);
    }
  };
  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="w-full  transform flex-col items-center text-left shadow-xl transition-all">
        <section className="flex flex-col items-center rounded-t-lg bg-brand-1 px-5 pt-5 text-center text-white">
          <Icon.X className="absolute right-3 top-3" onClick={onClose} />
          <Icon.Bookmark className="wh-10 flex items-center stroke-white" />
          <h2>용어 부록</h2>
          <p>청정이가 알려줄게</p>

          <Tab className="mt-4 w-full items-end justify-center">
            {TAB_DATA.map((t, i) => (
              <Tab.Item
                key={i}
                text={t.text}
                selected={page === i}
                onClick={() => setPage([i, i - page])}
                className="rounded-t-2xl bg-white py-3 px-2"
              />
            ))}
          </Tab>
        </section>
        <motion.section
          className="h-full w-full flex-col rounded-b-lg bg-white p-5 text-center"
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30, duration: 2 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <>
            <div className="mb-2 font-bold">{TAB_DATA[page].boldBody}</div>
            {TAB_DATA[page].body}
            {page < 2 && (
              <>
                <div className={`relative mt-2 h-40`}>
                  <Image
                    priority={false}
                    src={`/assets/characters/${TAB_DATA[page].imgPath}`}
                    alt="표"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <a
                  className="flex flex-col items-end"
                  href={`${TAB_DATA[page].docUrl}`}
                >
                  자세히 보기{' >'}
                </a>
              </>
            )}
            {page === 2 &&
              DOC_DOWNLOAD.map((doc) => (
                <DocLinkList key={doc.id} items={doc} />
              ))}
          </>
        </motion.section>
      </div>
    </AnimationLayout>
  );
};

export default AppendixModal;
