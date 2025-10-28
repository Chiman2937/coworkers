'use client';
import { useRouter } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import useAuthStore from '@/app/store/useAuthStore';
import { Button } from '@/components/Button/Button';
import FormField from '@/components/FormField/FormField';
import FormHint from '@/components/FormField/FormHint';
import FormInput from '@/components/FormField/FormInput';
import FormLabel from '@/components/FormField/FormLabel';
import FormLayout from '@/components/layout/FormLayout';

import AuthHeader from '../components/AuthHeader';
import SocialGroup from '../components/SocialGroup';
import SocialNav from '../components/SocialNav';

const schema = z.object({
  email: z.email('이메일 형식으로 작성해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요').max(10, '열글자 이하 입력 필요'),
});

const LoginForm = () => {
  const { signin } = useAuthStore();
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await signin(data);
    router.replace('/');
  };

  return (
    <FormLayout className='my-7 px-11 pt-14 pb-14 md:pb-17.5'>
      <AuthHeader>로그인</AuthHeader>
      <FormProvider {...methods}>
        <form
          className='flex flex-col gap-6 pb-12 md:pb-15'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField name='email'>
            <FormLabel>이메일</FormLabel>
            <FormInput placeholder='이메일을 입력해주세요.' type='email' />
            <FormHint />
          </FormField>

          <FormField name='password'>
            <FormLabel>비밀번호</FormLabel>
            <FormInput placeholder='비밀번호를 입력해주세요' type='password' />
            <FormHint />
            <nav className='flex justify-end'>
              <button
                className='text-lg-regular mt-3 text-right text-blue-400 underline'
                type='button'
              >
                비밀번호를 잊으셨나요?
              </button>
            </nav>
          </FormField>

          <Button className='w-full' variant='primary'>
            로그인
          </Button>
          <nav className='mx-auto flex gap-3'>
            <span className='text-lg-medium text-text-primary'>아직 계정이 없으신가요?</span>
            <button className='text-lg-regular text-blue-400 underline' type='button'>
              가입하기
            </button>
          </nav>
        </form>
      </FormProvider>
      <div className='flex flex-col gap-4'>
        <SocialNav />
        <SocialGroup type='signin' />
      </div>
    </FormLayout>
  );
};

export default LoginForm;
