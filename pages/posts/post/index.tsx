import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Authorization from 'src/components/authorization/Authorization';
import PostListCard, { Intro } from 'src/components/card/PostListCard';
// import Search from 'src/components/input/Search';
import { Label } from 'src/components/label/Label';

export const PostListPage = () => {
  const [post, setPost] = useState<any>();

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/posts/post/')
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((error) => console.error);
  }, []);

  return (
    <div className="p-5">
      <div className="mt-10 mb-12 space-y-2.5">
        <Image
          src="/assets/characters/2chars.png"
          alt=""
          className="absolute top-0 -right-0 bg-contain bg-center"
          width={250}
          height={182}
        />
        <p className="text-3xl text-brand-1">
          <span className="font-bold">청</span>년{' '}
          <span className="font-bold">정</span>책
        </p>
        <p>
          누구보다 쉽게 <br /> 나에게 필요한 청년 정책만 쏙쏙! <br /> 실제
          신청자의 생생한 후기까지! <br /> <br />
          <span className="font-bold">
            정책명 옆에 있는 숫자는 정책 신청 단계의 <br /> 수를 의미해. 작은
            숫자일수록 신청이 간단하겠지?
          </span>
        </p>
      </div>
      {/* <Search placeholder="검색" className="w-full" /> */}

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

      <Authorization />
    </div>
  );
};

export default PostListPage;
