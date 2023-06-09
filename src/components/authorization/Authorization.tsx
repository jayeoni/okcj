import React, { useState } from 'react';
import AppendixModal from 'src/components/modal/AppendixModal';
import { LoginModal } from 'src/components/modal/LoginModal';
import MyModal from 'src/components/modal/MyModal';
import SignUpModal from 'src/components/modal/SignUpModal';
import { useAuth } from 'src/hooks';

import { Icon } from '../common/Icon';

export const Authorization = () => {
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [appendixOpen, setAppendixOpen] = useState<boolean>(false);
  const [moreOpen, setMoreOpen] = useState<boolean>(false);
  const [myOpen, setMyOpen] = useState<boolean>(false);

  const { authenticated, logout } = useAuth();
  return (
    <>
      <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <MyModal open={myOpen} onClose={() => setMyOpen(false)} />
      <AppendixModal
        open={appendixOpen}
        onClose={() => setAppendixOpen(false)}
      />
      <section className="fixed bottom-24 right-5 z-20 flex-col space-y-1 text-sm text-white">
        {moreOpen === true && (
          <>
            {authenticated ? (
              <>
                <button
                  className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md "
                  onClick={() => logout()}
                >
                  로그 <br /> 아웃
                </button>
                <button
                  className="wh-14 flex items-center justify-center rounded-full bg-[#6EE7B7] bg-opacity-90 shadow-md"
                  onClick={() => setMyOpen(true)}
                >
                  My
                </button>
              </>
            ) : (
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
              </>
            )}
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
    </>
  );
};

export default Authorization;
