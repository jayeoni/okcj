import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ContentsPageCard, {
  Content,
} from 'src/components/card/ContentsPageCard';
import { SwiperSlide } from 'swiper/react';

export const ListPage = () => {
  const router = useRouter();

  const [post, setPost] = useState<any>();
  // axios
  //   .get(`https://jain5379.pythonanywhere.com/posts/post`, {
  //     withCredentials: true,
  //   })
  //   .then((response) => console.log(response));

  useEffect(() => {
    fetch('https://jain5379.pythonanywhere.com/posts/post/')
      .then((res) => res.json())
      .then((post) => setPost(post))
      .catch((error) => console.error);
  }, [post]);

  return (
    <div className="p-5">
      <h2 className="mt-5 text-brand-1">정책 콘텐츠</h2>
      <p className="mt-2.5 mb-20 ">
        ‘행정’, ‘정책’이라고 하면 막연히 거리감부터 느껴졌다고? 1주일에 한 번씩
        업데이트되는 “오케이, 청정!”의 정책 콘텐츠로 나를 위한 정책 정보, 내
        것으로 만들어보자!
      </p>

      <div className="grid grid-cols-2 gap-5">
        {post?.map((content: Content) => (
          <SwiperSlide key={content.id} className="">
            <ContentsPageCard items={content} />
          </SwiperSlide>
        ))}
      </div>
    </div>
  );
};

export default ListPage;
