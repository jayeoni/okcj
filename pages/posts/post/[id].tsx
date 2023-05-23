import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Authorization from 'src/components/authorization/Authorization';
import { Button } from 'src/components/button/Button';

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

  const momentObject = moment(content?.created_at);
  const formattedDate = momentObject.format('YYYY.MM.DD');

  if (!content) return <></>;
  return (
    <div className="h-full bg-gray-200">
      <div className="rounded-b-2xl bg-gradient-to-r from-emerald-300 to-cyan-300 pb-2.5 pt-24 drop-shadow">
        <div className="space-y-1 pl-4 pr-14 text-white">
          <h3 className="text-2xl">{content.title}</h3>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </div>
      <img
        className="p-5"
        alt=""
        src={content.images[0].image}
        // layout="fill"
        // objectFit="cover"
      ></img>
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
      <Authorization />
    </div>
  );
};

export default PostPage;
