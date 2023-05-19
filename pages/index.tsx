import Image from 'next/image';
import { useState } from 'react';
import { Button } from 'src/components/button/Button';
import LoginModal from 'src/components/modal/LoginModal';
import SignUpModal from 'src/components/modal/SignUpModal';
import { useAuth } from 'src/hooks';

export default function HomePage() {
  const { authenticated, logout } = useAuth();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen flex-col space-y-2 bg-brand-1 p-4 px-5">
      <section className="flex-grow space-y-3.5 text-white">
        <h1 className="mt-24 ">오케이, 청정!</h1>
        <p>
          정책잘알 청춘 라이프를 원한다면,
          <br />
          청년을 정책과 이어주는
          <br />내 손 위의 정책 놀이터
        </p>
      </section>

      <Image
        src="/assets/characters/bigChar1.png"
        alt=""
        className="absolute bottom-24 -right-0 bg-contain bg-center"
        width={700}
        height={460}
      />
      {/* {authenticated ? (
        <>
          <Button text="MyPage" className="filled-brand-1" to="/mypage" />
          <Button text="Logout" className="outlined-red-500" onClick={logout} />
        </>
      ) : (
        <Button
          text="시작하기"
          className="flex items-center justify-center bg-white p-5 font-extrabold text-brand-1 drop-shadow "
          to="/home"
        />
      )} */}

      <Button
        text="시작하기"
        className="flex items-center justify-center bg-white p-5 font-extrabold text-brand-1 drop-shadow "
        to="/home"
      />
      <SignUpModal open={signupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      <section className="flex space-x-3">
        <button
          className="flex w-full justify-center rounded-lg border bg-opacity-90 py-2 text-white"
          onClick={() => setSignupOpen(true)}
        >
          회원 가입
        </button>

        <button
          className="flex w-full items-center justify-center rounded-lg border bg-opacity-90 py-2 text-white shadow-md "
          onClick={() => setLoginOpen(true)}
        >
          로그인
        </button>
      </section>
    </div>
  );
}
