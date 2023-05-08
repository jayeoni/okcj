import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Authorization from 'src/components/authorization/Authorization';
import { Button } from 'src/components/button/Button';
import { MomentFormat, utcToLocalFormat } from 'src/plugins/moment';

export const PostPage = () => {
  const [content, setContent] = useState<any>();

  const router = useRouter();
  const id = router.query.id;
  useEffect(() => {
    if (id)
      fetch(`https://jain5379.pythonanywhere.com/policys/post/${id}/`)
        .then((res) => res.json())
        .then((content) => setContent(content))
        .catch((error) => console.error);
  }, [id]);

  if (!content) return <></>;
  return (
    <div className="h-full bg-gray-200">
      <div className="rounded-b-2xl bg-gradient-to-r from-emerald-300 to-cyan-300 pb-2.5 pt-24 drop-shadow">
        <div className="space-y-1 pl-4 pr-14 text-white">
          <h3 className="text-2xl">{content.title}</h3>
          <p className="text-sm">
            {utcToLocalFormat(
              new Date(content.created_at).toLocaleString(),
              MomentFormat.YYYYMMDD
            )}
          </p>
        </div>
      </div>
      <section className="p-5">{content.content}</section>
      <section className="bottom-0 w-full space-y-5 bg-white p-5">
        <Button
          text="커뮤니티 바로 가기"
          className="w-full drop-shadow-md"
          to="/community"
        />
        <Button
          text="목록 보기"
          className="w-full drop-shadow-md"
          to="/posts"
        />
      </section>
      {/* <button
        className="wh-12 fixed bottom-24 right-5 z-20 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90"
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="blur-sm" />
        <Icon.ChevronUp className="wh-8 stroke-white stroke-2" />
      </button> */}
      <Authorization />
    </div>
  );
};

export default PostPage;
