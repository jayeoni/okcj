// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Authorization from 'src/components/authorization/Authorization';
import { Avatar } from 'src/components/avatar/Avatar';
import { Chat, ChatBox } from 'src/components/card/ChatBox';
import { Icon } from 'src/components/common/Icon';
import TextField from 'src/components/input/TextField';
import { api } from 'src/plugins/axios';

export const ReviewPage = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [post, setPost] = useState<any>();
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();

  const policyId = router.query.policyId;
  const policyIdNum = parseInt(policyId as string);

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/postscript/post/`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/posts/post/${policyId}/`)
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((error) => console.error);
  }, [policyId]);

  const sendPostscriptData = async () => {
    try {
      const postscriptData = {
        title: title,
        post: policyId,
        content: text,
      };
      const response = await api.post('/postscript/post/', postscriptData);
      console.log('Server response: ', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <></>;
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col px-5 py-2">
        <p className="mt-3 text-sm text-gray-500">
          지금 바로 내가 경험한 정책에 대한 후기를 작성하고 이 정책을 신청할
          누군가에게는 유용한 “정보”가 된다는 뿌듯함을 느껴봐요!
        </p>
        <div className="hide-scrollbar h-full overflow-scroll py-8">
          <section className="space-y-5 ">
            <div className="flex items-end">
              <div className="mr-1 w-full space-y-3 rounded-tl-2xl rounded-tr-3xl rounded-bl-3xl bg-white p-5 text-sm shadow">
                <h4 className="flex items-center space-x-1 text-lg font-bold text-brand-1">
                  청정이가 알려주는 이용 가이드
                </h4>

                <p>
                  🌱 신청했던 과정과 결과를 중심으로 작성해주세요. <br /> 🌱
                  정책, 정책 신청 절차 등과 관련한 허위사실 기재는 절대 금지!
                </p>

                <p className="text-xs text-brand-1">
                  소득 어쩌구 예시를 달아줍니다 이렇게 이렇게 예시를 달아줍니다.
                  어쩌구저쩌구 어쩌구저쩌구 이렇게 길게 다실 예정인가요? 이렇게
                  길게 써봅니다.
                </p>
              </div>

              <Avatar
                src="/assets/characters/char1.png"
                className="wh-12 scale-125 transform"
              />
            </div>
            {/* {data.post === policyId &&
              data.map((chat: Chat) => <ChatBox key={chat.id} items={chat} />)} */}
            {data
              .filter((item: Chat) => item.post === policyIdNum)
              .map((chat: Chat) => (
                <ChatBox key={chat.id} items={chat} />
              ))}
          </section>
        </div>
      </div>

      {/* 입력란 */}
      <div className="fixed bottom-0 flex w-full items-center space-x-4 rounded-t-3xl bg-white p-6 opacity-90 shadow-2xl hover:opacity-100">
        <section className="flex-1 flex-col space-y-2">
          <TextField
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="rounded-t-3xl px-4 py-1 hover:border-2 hover:border-brand-1"
            placeholder="제목을 입력합니다"
          />
          <TextField
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="후기를 남겨주세요"
            className="rounded-b-3xl py-4 px-4 hover:border-2 hover:border-brand-1"
          />
        </section>
        <button
          onClick={() => {
            sendPostscriptData();
            window.location.reload();
          }}
          className="justify-center rounded-full bg-brand-1 py-2 pl-1.5 pr-2.5 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]"
        >
          <Icon.Send className="rotate-[42deg] stroke-white stroke-2" />
        </button>
      </div>

      <Authorization />
    </div>
  );
};

export default ReviewPage;
