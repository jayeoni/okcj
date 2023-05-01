import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/hooks';

import { Button } from '../button/Button';
import { Icon } from '../common/Icon';
import ModalTextField from '../input/ModalTextField';
import { AnimationLayout } from './AnimationLayout';

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  email: string;
  password: string;
  name: string;
}

export const SignUpModal: FC<SignUpModalProps> = ({ open, onClose }) => {
  //const [isCodeSent, setIsCodeSent] = useState(false);
  const { signup } = useAuth();
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
          <p className="pb-2.5 text-7xl">🙌</p>
          <h2>회원가입</h2>
          <p>오케이! 청정에 온 것을 환영해!</p>
        </section>
        <form
          className="flex flex-col space-y-14 p-4 text-brand-1"
          onSubmit={handleSubmit((data) => signup(data))}
        >
          <section className="flex flex-col space-y-6">
            <ModalTextField
              label="아이디"
              helper={errors.name?.message}
              {...register('name', { required: '이름을 입력해주세요' })}
            />
            <ModalTextField
              type="email"
              label="이메일"
              placeholder="jayeon@example.com"
              helper={errors.email?.message}
              {...register('email', { required: '이메일을 입력해주세요' })}
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

            <ModalTextField
              label="닉네임"
              helper={errors.name?.message}
              {...register('name', { required: '이름을 입력해주세요' })}
            />
          </section>

          <Button text="가입하기" className="filled-brand-1" />
        </form>
      </div>
    </AnimationLayout>
  );
};

export default SignUpModal;
