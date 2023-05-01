import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/button/Button';
import DocumentCard from 'src/components/card/DocumentCard';
import { DOCUMENT_DUMMY } from 'src/dummies';

export const PolicyDetailPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<any>();

  const detailId = router.query.detailId;
  useEffect(() => {
    if (detailId)
      fetch(`https://jain5379.pythonanywhere.com/posts/post/${detailId}`)
        .then((res) => res.json())
        .then((post) => setPost(post))
        .catch((error) => console.error);
  }, [detailId]);

  return (
    <div className="mb-20 p-5">
      {/* tree img */}
      <Image
        src="/assets/characters/Tree.png"
        alt=""
        className="absolute top-9 -right-0 bg-contain bg-center"
        width={106}
        height={130}
      />

      <div className="space-y-1 py-11 pr-9">
        <h2 className="pr-11 text-brand-1">{post?.title}</h2>
        <p className="pr-16 text-sm text-slate-900">{post?.intro}</p>
      </div>

      <div className="space-y-14">
        {/* 신청 요건 */}
        <div className="mt-9 space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-brand-1">신청 요건</h3>
            <div className="rounded-2xl bg-brand-1 px-2.5 text-white">3</div>
          </div>
          <div className="flex-col space-y-2 rounded-2xl p-4 shadow-[0_3px_15px_3px_rgba(0,0,0,0.05)]">
            <section className="flex space-x-2">
              <div className="wh-5 min-w-5 items-center rounded-md bg-brand-2 text-center text-sm font-semibold text-white">
                1
              </div>
              <p>{post?.post_condition[0].text}</p>
            </section>
            <section className="flex space-x-2 rounded-2xl">
              <div className="wh-5 min-w-5 items-center rounded-md bg-brand-2 text-center text-sm font-semibold text-white">
                2
              </div>
              <p>{post?.post_condition[1].text}</p>
            </section>
            <section className="flex space-x-2 rounded-2xl">
              <div className="wh-5 min-w-5 items-center rounded-md bg-brand-2 text-center text-sm font-semibold text-white">
                3
              </div>
              <p>{post?.post_condition[2].text}</p>
            </section>
          </div>
        </div>

        {/* 신청 과정 */}
        <div className=" mt-16 grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-brand-1">신청 과정</h3>
            <div className="rounded-2xl bg-brand-1 px-2.5 text-white">4</div>
          </div>

          {/*여기 문제 있음.. */}
          <div className="relative h-[400px]">
            <Image
              className="rounded-lg object-contain"
              src={post?.represent_image || ''}
              alt=""
              layout="fill"
            />
          </div>
        </div>
        {/* <div className="mt-16 h-full w-full space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-brand-1">신청 과정</h3>
            <div className="rounded-2xl bg-brand-1 px-2.5 text-white">4</div>
          </div>

          <img
            className="rounded-lg "
            src={post?.represent_image || ''}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div> */}

        {/* 구비 서류 */}
        <div className="mt-16 space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-brand-1">구비 서류</h3>
            <div className="rounded-2xl bg-brand-1 px-2.5 text-white">3</div>
          </div>
          <div className="flex justify-center space-x-5">
            {DOCUMENT_DUMMY.map((doc) => (
              <DocumentCard key={doc.id} items={doc} />
            ))}
          </div>
        </div>

        <div className="fixed bottom-8 z-10 w-full pr-10">
          <Button
            text="신청하러 바로 가기"
            className="w-full"
            to="https://yeyak.seoul.go.kr/web/search/selectPageListDetailSearchImg.do?code=T500&dCode=T514"
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailPage;
