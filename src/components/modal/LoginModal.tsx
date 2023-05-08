import axios from 'axios';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/hooks';
import { tokenState } from 'src/plugins/ridge';

import { Button } from '../button/Button';
import { Icon } from '../common/Icon';
import ModalTextField from '../input/ModalTextField';
import { AnimationLayout } from './AnimationLayout';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  password: string;
  username: string;
}

export const LoginModal: FC<LoginModalProps> = ({ open, onClose }) => {
  //const [isCodeSent, setIsCodeSent] = useState(false);
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <AnimationLayout open={open} onClose={onClose}>
      <div className="relative w-full transform flex-col items-center justify-between overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
        <section className="bg-brand-1 p-5 text-center text-white">
          <Icon.X className="absolute right-3 top-3" onClick={onClose} />
          <p className="pb-2.5 text-7xl">👋</p>
          <h2>로그인</h2>
          <p>오늘도 만나서 반가워!</p>
        </section>
        <form
          className="flex flex-col space-y-14 p-4 text-brand-1"
          onSubmit={handleSubmit((data) =>
            axios
              .post(`https://jain5379.pythonanywhere.com/accounts/login/`, data)
              .then((response) => {
                setUser(response.data.token);
                console.log(response.data.token);
                tokenState.set(response.data.token.access_token);
                onClose();
              })
          )}
        >
          <section className="flex flex-col space-y-6">
            <ModalTextField
              label="아이디"
              helper={errors.username?.message}
              {...register('username', { required: '아이디를 입력해주세요' })}
            />

            <ModalTextField
              type="password"
              label="비밀번호"
              helper={errors.password?.message}
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: { value: 6, message: '최소 6자 이상 가능합니다' },
                maxLength: {
                  value: 15,
                  message: '최대 15자 까지만 가능합니다',
                },
              })}
            />
          </section>

          <Button text="로그인하기" className="filled-brand-1" />
        </form>
      </div>
    </AnimationLayout>
  );
};

export default LoginModal;
