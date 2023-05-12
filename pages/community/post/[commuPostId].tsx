import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/button/Button';
import ChatBox, { Chat } from 'src/components/card/ChatBox';
import { Icon } from 'src/components/common/Icon';
import TextField from 'src/components/input/TextField';
import { HEAD_TYPE_KOREAN, HeadType } from 'src/constants/head';
import { api } from 'src/plugins/axios';
import { MomentFormat, utcToLocalFormat } from 'src/plugins/moment';
import { tokenState } from 'src/plugins/ridge';

interface DataType {
  id: number;
  user: string;
  created_at: string;
  modified_at: string;
  title: string;
  content: string;
  comment: any; //나중에 array comment type 달아주기
  community_category: HeadType;
}

export const CommuPostPage = () => {
  const router = useRouter();
  const [data, setData] = useState<DataType>();
  const [text, setText] = useState<string>();

  const commuPostId = router.query.commuPostId;
  useEffect(() => {
    if (commuPostId)
      fetch(
        `https://jain5379.pythonanywhere.com/community/post/${commuPostId}/`
      )
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((error) => console.error);
  }, [commuPostId]);

  const sendCommentData = async () => {
    try {
      const commentData = {
        post: commuPostId,
        content: text,
      };
      const response = await api.post('/community/comment/', commentData);
      console.log('Server response: ', response.data);
      tokenState.set(response.data.token.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(text);

  if (!data) return <></>;
  return (
    <>
      <div className="px-5">
        <div className="mb-12 space-y-1 pt-11">
          <h2 className="text-brand-1">
            [{HEAD_TYPE_KOREAN[data.community_category]}] {data.title}
          </h2>
          <p className="text-sm text-slate-500">
            {data.user} |{' '}
            {utcToLocalFormat(
              new Date(data.created_at).toLocaleString(),
              MomentFormat.YYYYMMDDHmm
            )}
          </p>
        </div>
        <div className="h-96 rounded-2xl p-5 text-sm shadow-[1px_0_35px_1px_rgba(0,0,0,0.05)]">
          {data.content}
        </div>
      </div>
      <section className="fixed bottom-0 h-80 w-full space-y-5 overflow-scroll rounded-t-3xl bg-gray-50 px-5 pt-6 pb-28 shadow-[5px_5px_20px_10px_rgba(0,0,0,0.05)] ">
        {data.comment?.map((chat: Chat) => (
          <ChatBox key={chat.id} items={chat} />
        ))}
      </section>

      {/* 입력란 */}
      <div className="fixed bottom-0 flex w-full items-center space-x-4 rounded-t-3xl bg-white p-5 opacity-90 shadow-2xl hover:opacity-100">
        <TextField
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="댓글을 남겨주세요"
          className="rounded-full py-2 px-4 hover:border-2 hover:border-brand-1"
        />
        <Button
          className="justify-center rounded-full bg-brand-1 py-1 pl-2 pr-3 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]"
          onClick={() => {
            sendCommentData();
            window.location.reload();
          }}
          type="submit"
        >
          <Icon.Send className="rotate-[42deg] stroke-white stroke-2" />
        </Button>
      </div>
    </>
  );
};

export default CommuPostPage;
