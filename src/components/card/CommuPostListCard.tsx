import Link from 'next/link';
import React from 'react';
import { HEAD_TYPE_KOREAN, HeadType } from 'src/constants/head';
export interface Commu {
  id: number;
  community_category: HeadType; //enum으로 만들기
  user: string;
  title: string;
}

interface CommuPostListProps {
  items: Commu;
}

export const CommuListCard = (props: CommuPostListProps) => {
  const { items } = props;
  return (
    <Link href={`/community/post/${items.id}`}>
      <p>
        [{HEAD_TYPE_KOREAN[items.community_category]}] {items.title}
      </p>
    </Link>
  );
};

export default CommuListCard;
