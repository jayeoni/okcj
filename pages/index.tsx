import Image from 'next/image';
import { Button } from 'src/components/button/Button';
import { useAuth } from 'src/hooks';

export default function HomePage() {
  const { authenticated, logout } = useAuth();

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
        className="absolute bottom-20 -right-0 bg-contain bg-center"
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
    </div>
  );
}
