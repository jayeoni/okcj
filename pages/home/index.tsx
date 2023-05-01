import 'swiper/swiper.min.css';
import 'swiper/css/free-mode';

import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/button/Button';
import ContentsCard, { Policy } from 'src/components/card/ContentsCard';
import { Icon } from 'src/components/common/Icon';
import { Label } from 'src/components/label/Label';
import PostList, { Post } from 'src/components/list/PostList';
import PostscriptCard, { Postscript } from 'src/components/list/PostscriptList';
import AppendixModal from 'src/components/modal/AppendixModal';
import { LoginModal } from 'src/components/modal/LoginModal';
import SignUpModal from 'src/components/modal/SignUpModal';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export const HomePage = () => {
  const [post, setPost] = useState<any>();
  const [policy, setPolicy] = useState<any>();
  const [postscript, setPostscript] = useState<any>();

  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [appendixOpen, setAppendixOpen] = useState<boolean>(false);
  const [moreOpen, setMoreOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/posts/post/')
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((error) => console.error);
  }, [post]);

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/policys/post/')
      .then((res) => res.json())
      .then((policy) => setPolicy(policy))
      .catch((error) => console.error);
  }, [policy]);

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/postscript/post/')
      .then((res) => res.json())
      .then((postscript) => setPostscript(postscript))
      .catch((error) => console.error);
  }, [postscript]);

  return (
    <div className="px-5 pt-5 pb-24">
      <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <AppendixModal
        open={appendixOpen}
        onClose={() => setAppendixOpen(false)}
      />

      <h2 className="text-brand-1">
        오늘의 날씨는 맑음, <br />
        오늘 정책 한 잔 어때?
      </h2>

      {/* Sns Button Section */}
      <section className="absolute top-3 right-2 flex space-x-2">
        <Link href="https://closed-creature-9cf.notion.site/OKAY-8a23226992a34c7087801efd32498cf0 ">
          <Icon.Notion className="wh-7 rounded-lg bg-brand-1 stroke-white stroke-0 p-1 drop-shadow-sm" />
        </Link>
        <Link href="https://instagram.com/ok_yp.15?igshid=ZmI3MzJjNWI=">
          <Icon.Instagram className="wh-7 rounded-lg bg-brand-1 stroke-white p-1 drop-shadow-sm" />
        </Link>
      </section>

      <Image
        src="/assets/characters/Tree.png"
        alt=""
        className="absolute top-20 -right-0 bg-contain bg-center"
        width={149}
        height={182}
      />

      <div className="mt-48 space-y-10 text-brand-1">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h3>곧 마감되는 정책</h3>
            <Label text="HOT" className="bg-brand-1" />
          </div>
          <div className="grid grid-cols-4 items-center">
            <section className="hide-scrollbar col-span-3 grid items-center overflow-y-scroll p-1">
              {post?.map((list: Post) => (
                <PostList key={list.id} items={list} />
              ))}
            </section>
            <Button
              text="청년 정책 보러 가기"
              className="h-20 p-3 text-sm font-extrabold"
              to="/posts"
            />
          </div>
        </div>

        <div className="space-y-5">
          <section className="flex items-center space-x-2">
            <h3>최신 정책 콘텐츠</h3>
            <Label
              text="목록 바로 가기"
              className="rounded-full bg-brand-1 py-1 px-2.5 text-sm font-bold text-white"
              onClick={() => router.push(`/posts`)}
            />
          </section>
          <div className="space-y-3">
            {!policy ? (
              <p className="text-sm text-gray-400">작성된 소식이 없습니다.</p>
            ) : (
              <Swiper
                className="mySwiper max-w-md"
                slidesPerView="auto"
                modules={[FreeMode]}
                spaceBetween={10}
                slidesOffsetBefore={0}
                slidesOffsetAfter={0}
                freeMode={true}
              >
                {policy?.map((policy: Policy) => (
                  <SwiperSlide key={policy.id} className="w-auto">
                    <ContentsCard key={policy.id} items={policy} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <section className="flex items-center space-x-2">
            <h3>최신 정책 후기</h3>
            <Label
              text="목록 바로 가기"
              className="rounded-full bg-brand-1 py-1 px-2.5 text-sm font-bold text-white"
              onClick={() => router.push(`/posts/post`)}
            />
          </section>
          <div className="space-y-3">
            {!postscript ? (
              <p className="text-sm text-gray-400">작성된 후기가 없습니다.</p>
            ) : (
              // <Swiper
              //   className="mySwiper max-w-md"
              //   slidesPerView="auto"
              //   modules={[FreeMode]}
              //   spaceBetween={10}
              //   slidesOffsetBefore={0}
              //   slidesOffsetAfter={0}
              //   freeMode={true}
              // >
              //   {postscript?.map((content: Postscript) => (
              //     <SwiperSlide key={content.id} className="w-auto">
              //       <PostscriptCard items={content} />
              //     </SwiperSlide>
              //   ))}
              // </Swiper>
              <section className="hide-scrollbar col-span-3 grid items-center overflow-y-scroll p-1">
                {postscript.map((list: Postscript) => (
                  <PostscriptCard key={list.id} items={list} />
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 z-10 w-full pr-10">
        <Button text="커뮤니티 바로 가기" className="w-full" to="/community" />
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
          className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md "
          onClick={() => setMoreOpen(!moreOpen)}
        >
          <Icon.MoreVertical className="stroke-white" />
        </button>
      </section>
    </div>
  );
};

export default HomePage;
