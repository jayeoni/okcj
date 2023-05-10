import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/button/Button';
import DocumentCard, { Doc } from 'src/components/card/DocumentCard';
import PostConditionCard, {
  Condition,
} from 'src/components/card/PostConditionCard';

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
    <div className="mb-20">
      <div className="mx-5 space-y-1 py-11 pr-9">
        <h2 className="pr-11 text-brand-1">{post?.title}</h2>
        <p className="pr-16 text-sm text-slate-900">{post?.intro}</p>
      </div>

      <div className="space-y-14">
        {/* 신청 요건 */}
        <div className="mx-5 mt-9 space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-brand-1">신청 요건</h3>
            <div className="rounded-2xl bg-brand-1 px-2.5 text-white">
              {post?.post_condition.length}
            </div>
          </div>

          <div className="flex-col justify-center space-y-2 rounded-2xl p-4 shadow-[0_3px_15px_3px_rgba(0,0,0,0.05)]">
            {post?.post_condition?.length ? (
              <>
                {post.post_condition.map((con: Condition, index: number) => (
                  <section key={con.id} className="flex space-x-2">
                    <div className="wh-5 min-w-5 items-center rounded-md bg-brand-2 text-center text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <PostConditionCard items={con} />
                  </section>
                ))}
              </>
            ) : (
              <p>필요한 신청 요건이 없습니다.</p>
            )}
          </div>

          {/* 신청 과정 */}
          {post?.represent_image && (
            <div className="relative py-8">
              <img
                className="h-max w-full rounded-lg object-contain"
                src={post?.represent_image || ''}
                alt=""
                layout="fill"
              />
            </div>
          )}
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
          <div className="space-y-4 pb-12">
            <div className="flex items-center space-x-2">
              <h3 className="text-brand-1">구비 서류</h3>
              <div className="rounded-2xl bg-brand-1 px-2.5 text-white">
                {post?.post_url.length}
              </div>
            </div>
            <div className="flex-col justify-center space-y-2 rounded-2xl p-4 shadow-[0_3px_15px_3px_rgba(0,0,0,0.05)]">
              {post?.post_url?.length ? (
                <>
                  {post.post_url.map((doc: Doc) => (
                    <DocumentCard key={doc.id} items={doc} />
                  ))}
                  <p className="text-sm text-slate-500">
                    서류 이름을 누르면 해당 서류 발급 사이트로 연결돼!
                  </p>
                </>
              ) : (
                <p>필요한 구비 서류가 없습니다.</p>
              )}
            </div>
          </div>

          <div className="fixed bottom-8 z-10 w-full pr-10">
            <Button
              text="신청하러 바로 가기"
              className="w-full"
              to={post?.site}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetailPage;
