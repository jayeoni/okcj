import Link from 'next/link';
import React from 'react';

export interface Commu {
  id: number;
  community_category: string; //enum으로 만들기
  title: string;
}

interface CommuListProps {
  items: Commu;
}

export const CommuList = (props: CommuListProps) => {
  const { items } = props;
  return (
    <Link
      className="flex space-x-1 border-t py-7"
      href={`/community/post/${items.id}`}
    >
      <p className="text-sm text-slate-500">
        [{items.community_category}] {items.title}
      </p>
    </Link>
  );
};

export default CommuList;
