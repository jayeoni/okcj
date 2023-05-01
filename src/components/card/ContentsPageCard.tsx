import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

//communiti post 전체 조회 참고
export interface Content {
  id: number;
  title: string;
  post_url: {
    url: string;
  }[];
  represent_image: string;
}

interface ContentPageCardProps {
  items: Content;
}

export const ContentPageCard = (props: ContentPageCardProps) => {
  const { items } = props;
  const { push } = useRouter();
  return (
    <div
      className="relative aspect-square h-full w-full"
      onClick={() => push(`/posts/post/${items.id}`)}
    >
      <Image
        src={items?.represent_image || ''}
        alt=""
        layout="fill"
        objectFit="cover"
        className="rounded-xl "
      />
    </div>
  );
};

export default ContentPageCard;
