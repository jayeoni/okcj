import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/button/Button';
import CommuListCard, { Commu } from 'src/components/list/CommuList';

export const CommunityPage = () => {
  const [commu, setCommu] = useState<any>();

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/community/post/`)
      .then((res) => res.json())
      .then((commu) => setCommu(commu))
      .catch((error) => console.error);
  }, []);

  return (
    <div className="px-5">
      <div className="space-y-1 pt-11">
        <h2 className="mb-28 text-brand-1">커뮤니티</h2>
        <p className="text-sm text-slate-500">
          오케이, 청정! 커뮤니티는 <br />
          1)“정책 컨텐츠”에 대한 생각, 혹은 <br />
          2)진로 준비의 과정에서 느끼는 일상적인 어려움, <br />
          3)정책에 관한 자신의 아이디어를 나누는 공간입니다.
        </p>
        <Image
          src="/assets/characters/cjCharacters.png"
          alt=""
          className="absolute top-4 -right-0 bg-contain bg-center"
          width={220}
          height={200}
        />
      </div>
      <div className="mb-20 pt-4">
        {commu?.map((title: Commu) => (
          <CommuListCard key={title.id} items={title} />
        ))}
      </div>

      <div className="fixed bottom-8 z-10 w-full pl-2 pr-12">
        <Button text="글쓰기" className="w-full" to="/community/upload" />
      </div>
    </div>
  );
};

export default CommunityPage;
