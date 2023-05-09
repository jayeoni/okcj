import Link from 'next/link';
import React from 'react';

import { Label } from '../label/Label';

export interface Post {
  id: number;
  title: string;
  post_url: {
    url: string;
  }[];
  dday: number;
}
interface PostListProps {
  items: Post;
}

export const PostList = (props: PostListProps) => {
  const { items } = props;

  const today = new Date();
  const dday = new Date(items.dday);
  const diffTime = Math.abs(dday.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7)
    return (
      <div className="space-x-1.5">
        <Label text={`D-${diffDays}`} className="bg-brand-2" />
        <Link
          // href={items?.post_url[0]?.url || ''}
          href={`/policy/${items.id}`}
          className="overflow-hidden text-clip"
        >
          {items.title}
        </Link>
      </div>
    );
  else return <></>;
};

export default PostList;
