import { useRouter } from 'next/router';
import React from 'react';

//communiti post 전체 조회 참고
export interface Postscript {
  id: number;
  user?: string;
  post: number;
  created_at?: string;
  modified_at?: string;
  title: string;
  content: string;
}

interface PostscriptListProps {
  items: Postscript;
}

export const PostScriptCard = (props: PostscriptListProps) => {
  const { items } = props;
  const { push } = useRouter();

  return (
    <div onClick={() => push(`/policy/${items.post}`)}>
      {/* <Image
        className="rounded-lg "
        src={items?.represent_image || ''}
        alt=""
        fill
      /> */}
      {items.title}
    </div>
  );
};

export default PostScriptCard;
