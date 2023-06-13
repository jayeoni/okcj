import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';
import PostscriptCard, { Postscript } from 'src/components/list/PostscriptList';
import { useAuth } from 'src/hooks';

import CommuListCard from '../card/CommuPostListCard';
import { Icon } from '../common/Icon';
import { Commu } from '../list/CommuList';
import { AnimationLayout } from './AnimationLayout';

export interface My {
  id: number;
  title: string;
  user: string;
}
interface MyModalProps {
  open: boolean;
  onClose: () => void;
}

export const MyModal: FC<MyModalProps> = ({ open, onClose }) => {
  const [postscript, setPostscript] = useState<any>();
  const [community, setCommunity] = useState<any>();
  const { userName, nickName, logout } = useAuth();

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/postscript/post/`)
      .then((res) => res.json())
      .then((postscript) => setPostscript(postscript))
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    fetch(`https://jain5379.pythonanywhere.com/community/post/`)
      .then((res) => res.json())
      .then((community) => setCommunity(community))
      .catch((error) => console.error);
  }, []);

  const users = postscript?.map((obj: Postscript) => obj.user);
  //   console.log(users);
  const isUserNameInList = users?.includes(nickName);
  //   console.log(isUserNameInList);

  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="w-full transform flex-col text-left shadow-xl transition-all">
        <section className="flex flex-col rounded-t-lg bg-brand-1 px-5 pt-5 pb-10 text-white">
          <Icon.X
            className="absolute right-3 top-3 stroke-white"
            onClick={onClose}
          />
          <h3>
            안녕 {userName} 👋 <br /> 오늘도 오케이-청정!
          </h3>
        </section>

        <section className="grid h-full w-full flex-col space-y-5 rounded-b-lg bg-white px-5 py-5">
          <div className="flex space-x-2">
            <Image
              src="/assets/characters/char1.png"
              alt=""
              width={40}
              height={40}
            />
            <h3 className="font-bold text-brand-1">{nickName}</h3>
          </div>

          <div className="rounded-lg border p-2 drop-shadow-lg">
            <h4 className="text-brand-1">내가 쓴 리뷰</h4>
            <div className="space-y-3">
              {isUserNameInList ? (
                <section className="hide-scrollbar col-span-3 grid items-center overflow-y-scroll p-1">
                  {postscript
                    ?.filter((obj: Postscript) => obj.user === nickName)
                    .map((list: Postscript) => (
                      <PostscriptCard key={list.id} items={list} />
                    ))}
                </section>
              ) : (
                <p className="text-sm text-gray-400">
                  아직 작성한 후기가 없습니다.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-lg border p-2 drop-shadow-lg">
            <h4 className="text-brand-1">내가 쓴 커뮤니티 글</h4>
            <div className="space-y-3">
              {isUserNameInList ? (
                <section className="hide-scrollbar col-span-3 grid items-center overflow-y-scroll p-1">
                  {community
                    ?.filter((obj: Commu) => obj.user === nickName)
                    .map((list: Commu) => (
                      <CommuListCard key={list.id} items={list} />
                    ))}
                </section>
              ) : (
                <p className="text-sm text-gray-400">
                  아직 작성한 글이 없습니다.
                </p>
              )}
            </div>
          </div>
          <button
            className="place-self-end rounded-lg bg-[#6EE7B7] bg-opacity-90 p-1 text-sm font-semibold text-white shadow-md"
            onClick={() => logout()}
          >
            로그아웃
          </button>
        </section>
      </div>
    </AnimationLayout>
  );
};

export default MyModal;
