import axios from 'axios';
import router from 'next/router';
import React, { useState } from 'react';
import { Avatar } from 'src/components/avatar/Avatar';
import { Button } from 'src/components/button/Button';
import { Icon } from 'src/components/common/Icon';
import TextArea from 'src/components/input/TextArea';
import TextField from 'src/components/input/TextField';
import AppendixModal from 'src/components/modal/AppendixModal';
import LoginModal from 'src/components/modal/LoginModal';
import SignUpModal from 'src/components/modal/SignUpModal';
import SelectHeadType from 'src/components/select/SelectHead';
import { HeadType } from 'src/constants/head';

export const CommuUploadPage = () => {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [selectValue, setSelectValue] = useState<HeadType | null>();

  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [appendixOpen, setAppendixOpen] = useState<boolean>(false);
  const [moreOpen, setMoreOpen] = useState<boolean>(false);

  const sendPostData = async () => {
    try {
      const postData = {
        community_category: selectValue,
        title: title,
        content: content,
      };
      const response = await fetch(
        'https://jain5379.pythonanywhere.com/community/post/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );
      const data = await response.json();
      console.log('Server response:', data);
      router.push('/community');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5">
      <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <AppendixModal
        open={appendixOpen}
        onClose={() => setAppendixOpen(false)}
      />

      <div className="relative my-7 inline-block w-full">
        <SelectHeadType
          placeholder="말머리 선택"
          values={Object.values(HeadType)}
          onChange={(e) => setSelectValue(e)}
          value={selectValue}
        />
      </div>

      <div className="flex items-center space-x-2.5 border-b-2 border-brand-1 p-2 text-brand-1">
        <h4 className="whitespace-nowrap border-r border-brand-1 px-2.5 text-lg font-semibold">
          제목
        </h4>
        <TextField
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="rounded-full border-none py-2 hover:border-2 hover:border-brand-1"
          placeholder="제목을 입력합니다"
        />
      </div>

      <div className="mt-2.5 mb-10 flex items-center space-x-1.5 text-slate-500">
        <Avatar className="wh-7" /> <p className="text-sm">과제하는 프로도</p>
      </div>

      <TextArea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="h-96 rounded-2xl p-5 text-sm shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] placeholder:text-xs placeholder:text-gray-400"
        placeholder={`건강하고 유용한 커뮤니티를 위해 다음의 약속들을 지켜주세요!\n
1. 다른 청정이들에게 불쾌감을 주거나 특정 인물을 저격하는 글은 작성하지 않습니다.\n
2. 폭력적인 글이나 지나친 욕설이 담긴 글은 작성하지 않습니다.\n
3. 정치, 젠더 등 우리 사회에 존재하는 모든 차별을 드러내는 글은 작성하지 않습니다.\n
상업 및 광고성 홍보글을 비롯해 위의 약속들을 지키지 않은 글들은 관리자에 의해 삭제 조치됩니다.\n
‘진로 준비’라는 공감대를 가진 우리 청정이들! 모두에게 즐겁고 편안한 공간이 될 수 있도록 서로 배려하는 마음으로 커뮤니티를 이용해주세요😊`}
      ></TextArea>

      <div className="fixed bottom-8 z-10 w-full pr-10">
        <Button
          text="등록하기"
          className="w-full"
          to="/community"
          onClick={() => {
            sendPostData();
            axios.post(
              `https://jain5379.pythonanywhere.com/community/post/`,
              {
                community_category: selectValue,
                title: title,
                content: content,
              },
              {
                headers: {
                  Authorization:
                    'Bearer ' + localStorage.getItem('access_token'),
                },
              }
            );
          }}
        />
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

export default CommuUploadPage;
