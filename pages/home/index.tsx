import 'swiper/swiper.min.css';
import 'swiper/css/free-mode';

import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import Authorization from 'src/components/authorization/Authorization';
import { Button } from 'src/components/button/Button';
import ContentsCard, { Policy } from 'src/components/card/ContentsCard';
import { Icon } from 'src/components/common/Icon';
import { Label } from 'src/components/label/Label';
import PostList, { Post } from 'src/components/list/PostList';
import PostscriptCard, { Postscript } from 'src/components/list/PostscriptList';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export const HomePage = () => {
  const [post, setPost] = useState<any>();
  const [policy, setPolicy] = useState<any>();
  const [postscript, setPostscript] = useState<any>();

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/posts/post/')
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/policys/post/')
      .then((res) => res.json())
      .then((policy) => setPolicy(policy))
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/postscript/post/')
      .then((res) => res.json())
      .then((postscript) => setPostscript(postscript))
      .catch((error) => console.error);
  }, []);

  // console.log(
  //   'policy: ',
  //   post.filter((item: Post) => item.progress === true)
  // );

  return (
    <div className="relative overflow-hidden px-5 pt-5 pb-24">
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
        src="/assets/characters/char1.png"
        alt=""
        className="absolute top-8 -right-10 rotate-12 bg-contain bg-center"
        width={260}
        height={220}
      />

      <div className="mt-40 space-y-10 text-brand-1">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h3>곧 마감되는 정책</h3>
            <Label text="HOT" className="bg-brand-1" />
          </div>
          <div className="grid grid-cols-4 items-center gap-1">
            <section className="hide-scrollbar col-span-3 grid items-center space-y-0.5 overflow-y-scroll p-1">
              {post
                ?.filter((item: Post) => item.progress !== true)
                .reverse()
                .map((list: Post) => (
                  <PostList key={list.id} items={list} />
                ))}
              {post?.filter((list: Post) => {
                const today = new Date();
                const dday = new Date(list.dday);
                const diffTime = Math.abs(dday.getTime() - today.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays < 5;
              }).length === 0 && <p>곧 마감되는 정책이 없습니다.</p>}
            </section>
            <Button
              text="청년 정책 보러 가기"
              className="h-20 p-3 text-sm font-extrabold"
              to="/posts/post"
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
                className="mySwiper flex max-w-md flex-row-reverse"
                slidesPerView="auto"
                modules={[FreeMode]}
                spaceBetween={10}
                slidesOffsetBefore={0}
                slidesOffsetAfter={0}
                freeMode={true}
              >
                {policy
                  ?.slice()
                  .reverse()
                  .map((policy: Policy) => (
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
              <section className="hide-scrollbar col-span-3 grid items-center overflow-y-scroll p-1">
                {postscript
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((list: Postscript) => (
                    <PostscriptCard key={list.id} items={list} />
                  ))}
              </section>
            )}
          </div>
        </div>
      </div>
      <Authorization />
      <div className="fixed bottom-8 z-10 w-full pr-10">
        <Button text="커뮤니티 바로 가기" className="w-full" to="/community" />
      </div>
    </div>
  );
};

export default HomePage;
