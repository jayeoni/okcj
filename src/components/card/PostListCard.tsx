import Link from 'next/link';
import React from 'react';

import { Label } from '../label/Label';

export interface Intro {
  id: number;
  title: string;
  post_url: {
    url: string;
  }[];
  site: string;
  feature_category: string;
  place: string;
  step: number;
}

interface PostListCardProps {
  items: Intro;
}

export const PostListCard = (props: PostListCardProps) => {
  const { items } = props;
  return (
    <div className="flex items-center justify-between border-t py-7 text-sm">
      <Link
        href={`/policy/detail/${items.id}`}
        // href={items?.post_url ? items.post_url[0]?.url || '' : ''}
        className="basis-3/5"
      >
        {items.title}
      </Link>

      <section className="flex space-x-1">
        <Label
          text={items.feature_category}
          className="h-7 rounded-md bg-brand-1"
        />
        <Label text={items.place} className="h-7 w-max rounded-md bg-brand-1" />
        <Label className="h-7 w-6 rounded-md bg-brand-1">{items.step}</Label>
      </section>
    </div>
  );
};

export default PostListCard;
