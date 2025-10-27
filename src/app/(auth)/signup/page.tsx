'use client';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

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
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.email('이메일 형식으로 작성해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요').max(10, '열글자 이하 입력 필요'),
  passwordVerify: z.string().min(1, '비밀번호를 입력해주세요').max(10, '열글자 이하 입력 필요'),
});

const SignupPage = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <FormLayout className='my-7 px-11 pt-18 pb-17.5'>
      <AuthHeader>회원가입</AuthHeader>
      <FormProvider {...methods}>
        <form
          className='flex flex-col gap-6 pb-10 md:pb-12'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField name='name'>
            <FormLabel>이름</FormLabel>
            <FormInput placeholder='이름을 입력해주세요' type='text' />
            <FormHint />
          </FormField>

          <FormField name='email'>
            <FormLabel>이메일</FormLabel>
            <FormInput placeholder='이메일을 입력해주세요.' type='email' />
            <FormHint />
          </FormField>

          <FormField name='password'>
            <FormLabel>비밀번호</FormLabel>
            <FormInput placeholder='비밀번호를 입력해주세요' type='password' />
            <FormHint />
          </FormField>

          <FormField name='passwordVerify'>
            <FormLabel>비밀번호 확인</FormLabel>
            <FormInput placeholder='비밀번호를 다시 한 번 입력해주세요' type='password' />
            <FormHint />
          </FormField>

          <Button className='w-full' variant='primary'>
            회원가입
          </Button>
        </form>
      </FormProvider>
      <div className='flex flex-col gap-4'>
        <SocialNav />
        <SocialGroup type='signup' />
      </div>
    </FormLayout>
  );
};

export default SignupPage;
