// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'src/components/avatar/Avatar';
import { Chat, ChatBox } from 'src/components/card/ChatBox';
import { Icon } from 'src/components/common/Icon';
import TextField from 'src/components/input/TextField';
import AppendixModal from 'src/components/modal/AppendixModal';
import LoginModal from 'src/components/modal/LoginModal';
import SignUpModal from 'src/components/modal/SignUpModal';

export const ReviewPage = () => {
  // const router = useRouter();
  const [data, setData] = useState<any>();
  const [post, setPost] = useState<any>();

  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [appendixOpen, setAppendixOpen] = useState<boolean>(false);
  const [moreOpen, setMoreOpen] = useState<boolean>(false);

  // const reviewId = router.query.reviewId;

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/postscript/post/`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      const reviewId = data[0].post;
      fetch(`https://jain5379.pythonanywhere.com/posts/post/${reviewId}/`)
        .then((res) => res.json())
        .then((post) => setPost(post))
        .catch((error) => console.error);
    }
  }, [data]);

  if (!data) return <></>;
  return (
    <div className="h-screen bg-brand-1">
      <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <AppendixModal
        open={appendixOpen}
        onClose={() => setAppendixOpen(false)}
      />
      <div className="space-y-1 py-11 pl-4 pr-10 text-white">
        <h2>{post?.title}</h2>
        <p className="text-sm">{post?.intro}</p>
      </div>

      <div className="flex h-full flex-col rounded-t-[50px] bg-gray-100 px-7 py-2.5">
        <div className="mx-24 bg-brand-1 p-0.5" />
        <p className="mt-7 text-sm text-gray-500">
          지금 바로 내가 경험한 정책에 대한 후기를 작성하고 이 정책을 신청할
          누군가에게는 유용한 “정보”가 된다는 뿌듯함을 느껴봐요!
        </p>
        <div className="hide-scrollbar h-full overflow-scroll pt-8 pb-24">
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
            {data?.map((chat: Chat) => (
              <ChatBox key={chat.id} items={chat} />
            ))}
          </section>
        </div>
      </div>

      {/* 입력란 */}
      <div className="fixed bottom-0 flex w-full items-center space-x-4 rounded-t-3xl bg-white p-6 opacity-90 shadow-2xl hover:opacity-100">
        <TextField
          placeholder="후기를 남겨주세요"
          className="rounded-full py-2 px-4 hover:border-2 hover:border-brand-1"
        />
        <button className="justify-center rounded-full bg-brand-1 py-2 pl-1.5 pr-2.5 drop-shadow-[0_3px_4px_rgba(0,0,0,0.25)]">
          <Icon.Send className="rotate-[42deg] stroke-white stroke-2" />
        </button>
      </div>

      <section className="fixed bottom-24 right-5 z-20 flex-col space-y-1 text-white">
        {moreOpen === true && (
          <>
            <button
              className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md "
              onClick={() => setLoginOpen(true)}
            >
              로그인
            </button>
            <button
              className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md"
              onClick={() => setSignupOpen(true)}
            >
              회원 <br /> 가입
            </button>
            <button
              className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md"
              onClick={() => setAppendixOpen(true)}
            >
              용어 <br /> 부록
            </button>
          </>
        )}
        <button
          className="wh-12 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md "
          onClick={() => setMoreOpen(!moreOpen)}
        >
          <Icon.MoreVertical className="stroke-white" />
        </button>
      </section>
    </div>
  );
};

export default ReviewPage;
