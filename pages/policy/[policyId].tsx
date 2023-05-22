import { motion } from 'framer-motion';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { PolicyTab } from 'src/components/tab/PolicyTab';

import PolicyDetailPage from './detail';
import ReviewPage from './review';

const TAB_DATA = [
  {
    id: 1,
    text: '정책 소개',
    body: <PolicyDetailPage />,
  },
  {
    id: 2,
    text: 'REVIEW',
    body: <ReviewPage />,
  },
];

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

export const PolicyPage = () => {
  const [data, setData] = useState<any>();
  const [post, setPost] = useState<any>();

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/postscript/post/`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const policyId = router.query.policyId;
      fetch(`https://jain5379.pythonanywhere.com/posts/post/${policyId}/`)
        .then((res) => res.json())
        .then((post) => setPost(post))
        .catch((error) => console.error);
    }
  }, [data]);

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
    <div className="mb-20">
      <div className="space-y-1 bg-brand-1 py-11 pl-4 pr-10 text-white">
        <h2>{post?.title}</h2>
        <p className="text-sm">{post?.intro}</p>
      </div>
      <PolicyTab className="flex w-full justify-evenly bg-brand-1">
        {TAB_DATA.map((t, i) => (
          <PolicyTab.Item
            key={i}
            text={t.text}
            selected={page === i}
            onClick={() => setPage([i, i - page])}
            className="w-full rounded-t-2xl border-t bg-white"
          />
        ))}
      </PolicyTab>

      <div className="flex-1">
        <motion.section
          className="w-full"
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
          {TAB_DATA[page].body}
        </motion.section>
      </div>
    </div>
  );
};

export default PolicyPage;
