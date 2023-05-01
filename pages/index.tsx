import OkCloudSVG from 'public/assets/characters/ok-cloud.svg';
import { Button } from 'src/components/button/Button';
import { useAuth } from 'src/hooks';
export default function HomePage() {
  const { authenticated, logout } = useAuth();

  return (
    <div className="flex h-screen flex-col space-y-2 bg-brand-1 p-4 px-5">
      <section className="space-y-3.5 text-white">
        <h1 className="mt-24 ">오케이, 청정!</h1>
        <p>
          청년과 정책을 이어주는 - <br />
          청년과 정책을 이어주는 - <br />
          청년과 정책을 이어주는 -
        </p>
      </section>

      <OkCloudSVG className="" />
      {authenticated ? (
        <>
          Ho
          <Button text="MyPage" className="filled-brand-1" to="/mypage" />
          <Button text="Logout" className="outlined-red-500" onClick={logout} />
        </>
      ) : (
        <Button
          text="시작하기"
          className="flex items-center justify-center bg-white p-5 font-extrabold text-brand-1 drop-shadow "
          to="/home"
        />
      )}
    </div>
  );
}
