import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PostListCard, { Intro } from 'src/components/card/PostListCard';
import { Icon } from 'src/components/common/Icon';
import Search from 'src/components/input/Search';
import { Label } from 'src/components/label/Label';
import AppendixModal from 'src/components/modal/AppendixModal';
import LoginModal from 'src/components/modal/LoginModal';
import SignUpModal from 'src/components/modal/SignUpModal';

export const PostListPage = () => {
  const [post, setPost] = useState<any>();

  const [moreOpen, setMoreOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [appendixOpen, setAppendixOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/posts/post/')
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((error) => console.error);
  }, [post]);

  return (
    <div className="p-5">
      <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <AppendixModal
        open={appendixOpen}
        onClose={() => setAppendixOpen(false)}
      />
      <div className="mt-10 mb-36 space-y-2.5">
        <Image
          src="/assets/characters/Tree.png"
          alt=""
          className="absolute top-12 -right-0 bg-contain bg-center"
          width={149}
          height={182}
        />
        <p className="text-3xl text-brand-1">
          <span className="font-bold">청</span>년{' '}
          <span className="font-bold">정</span>책
        </p>
        <p>정책 간단 한 줄 소개</p>
      </div>
      <Search placeholder="검색" className="w-full" />

      {/* 카드 */}
      <div className="my-10 space-y-5 rounded-2xl p-4 shadow-[0_0_15px_2px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-500">정책 분류</p>
          <section className="flex justify-center space-x-2.5">
            <Label text="취준" className="bg-brand-1" />
            <Label text="공부" className="bg-brand-1" />
            <Label text="진학" className="bg-brand-1" />
            <Label text="창업" className="bg-brand-1" />
            <Label text="청년" className="bg-brand-1" />
          </section>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-500">모집 상태</p>
          <section className="flex justify-center space-x-4">
            <Label text="모집 중" className="bg-brand-1" />
            <Label text="상시 모집" className="bg-brand-1" />
            <Label text="모집 종료" className="bg-brand-1" />
          </section>
        </div>
      </div>

      {/* lists */}
      {post?.map((list: Intro) => (
        <PostListCard key={list.id} items={list} />
      ))}

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
          className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md "
          onClick={() => setMoreOpen(!moreOpen)}
        >
          <Icon.MoreVertical className="stroke-white" />
        </button>
      </section>
    </div>
  );
};

export default PostListPage;
