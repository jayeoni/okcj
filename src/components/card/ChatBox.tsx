import React from 'react';
import { MomentFormat, utcToLocalFormat } from 'src/plugins/moment';
import { twMerge } from 'tailwind-merge';

import { Avatar } from '../avatar/Avatar';

export interface Chat {
  id: number;
  user: string;
  post?: number; //어디에 쓰는 거지?
  created_at: string;
  modified_at: string;
  title: string;
  content: string;
  imgPath?: string;
}

interface ChatBoxProps {
  items: Chat;
}

export const ChatBox = (props: ChatBoxProps) => {
  const { items } = props;
  return (
    <div
      className={twMerge(
        'flex items-end',
        items.id % 2 == 0 && 'flex-row-reverse'
      )}
    >
      {/* 프사 */}
      <div className="wh-12">
        <Avatar src={items.imgPath} />
      </div>
      <div
        className={twMerge(
          'w-full space-y-3 bg-white p-5 text-sm shadow',
          items.id % 2 == 0
            ? 'mr-2.5 rounded-tl-2xl rounded-tr-3xl rounded-bl-3xl'
            : 'ml-2.5 rounded-tl-3xl rounded-tr-2xl rounded-br-3xl'
        )}
      >
        <section className="flex items-center space-x-1 text-brand-1">
          <h4 className="text-lg font-bold">{items.user}</h4>
          <p className="text-xs">
            {utcToLocalFormat(
              new Date(items.created_at).toLocaleString(),
              MomentFormat.YYYYMMDDHmm
            )}
          </p>
        </section>
        {items.content}
      </div>
    </div>
  );
};

export default ChatBox;
