import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

//정책 콘텐츠 카드
export interface Policy {
  id: number;
  user?: string;
  created_at?: string;
  modified_at?: string;
  title?: string;
  represent_image: string;
}

interface ContentsCardProps {
  items: Policy;
}

export const ContentsCard = (props: ContentsCardProps) => {
  const { items } = props;
  const { push } = useRouter();

  return (
    <div className="wh-28" onClick={() => push(`/posts/post/${items.id}`)}>
      <Image
        className="rounded-lg "
        src={items?.represent_image || ''}
        alt=""
        fill
      />
    </div>
  );
};

export default ContentsCard;
