import React, { useState } from 'react';
import { Avatar } from 'src/components/avatar/Avatar';
import { Button } from 'src/components/button/Button';
import { Icon } from 'src/components/common/Icon';
import TextArea from 'src/components/input/TextArea';
import TextField from 'src/components/input/TextField';
import SelectHeadType from 'src/components/select/SelectHead';
import { HeadType } from 'src/constants/head';
import { users } from 'src/dummies';

export const CommuUploadPage = () => {
  const data = users;
  const [selectValue, setSelectValue] = useState<HeadType | null>();
  return (
    <div className="p-5">
      <div className="relative my-7 inline-block w-full">
        <SelectHeadType
          placeholder="말머리 선택"
          values={Object.values(HeadType)}
          onChange={(e) => setSelectValue(e)}
          value={selectValue}
        />
        {/* <select name="the_select" id="the_select" className="txt-select">
          <option disabled selected hidden>
            말머리 선택
          </option>
          <option value="1">정책 콘텐츠</option>
          <option value="2">일상</option>
          <option value="3">아이디어</option>
        </select> 
        <div className="select-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>*/}
      </div>
      <div className="flex space-x-2.5 border-b-2 border-brand-1 p-2 text-brand-1">
        <h4 className="whitespace-nowrap border-r border-brand-1 px-2.5 text-lg font-semibold">
          제목
        </h4>
        <TextField className="border-none" placeholder="제목을 입력합니다" />
      </div>
      <div className="mt-2.5 mb-10 flex items-center space-x-1.5 text-slate-500">
        <Avatar className="wh-7" /> <p className="text-sm">과제하는 프로도</p>
      </div>

      <TextArea
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
          to="/community/post/:commuPostId"
        />
      </div>

      <button
        className="wh-12 fixed bottom-24 right-5 z-20 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90"
        onClick={() => window.scrollTo(0, 0)}
      >
        <Icon.ChevronUp className="wh-8 stroke-white stroke-2" />
      </button>
    </div>
  );
};

export default CommuUploadPage;
