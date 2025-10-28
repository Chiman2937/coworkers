'use client';

import { useRouter } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { create } from '@/api/endpoints/group/group';
import { imageUpload } from '@/api/endpoints/image/image';
import { Button } from '@/components/Button/Button';
import { FormControl } from '@/components/FormField/FormControl';
import FormField from '@/components/FormField/FormField';
import FormHint from '@/components/FormField/FormHint';
import FormImageUpload from '@/components/FormField/FormImageUpload';
import FormInput from '@/components/FormField/FormInput';
import FormLabel from '@/components/FormField/FormLabel';
import FormLayout from '@/components/layout/FormLayout';

const schema = z.object({
  image: z.record(z.string(), z.instanceof(File).nullable()),
  name: z.string().min(1, '팀 이름을 입력해주세요'),
});

const AddTeamForm = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      image: {
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2324/image_default.png':
          null,
      },
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // console.log(data);
    const { image, name } = data;
    const [url, file] = Object.entries(image)[0];
    let uploadedImage: string;
    if (file) {
      uploadedImage = (await imageUpload({ image: file })).url;
    } else {
      uploadedImage = url;
    }
    const res = await create({
      image: uploadedImage,
      name,
    });
    router.push(`/${res.id}`);
  };

  return (
    <FormLayout className='my-7 px-11 pt-14 pb-14 md:pb-17.5'>
      <h2 className='text-xl-bold md:text-2xl-bold pb-8 md:pb-10'>팀 생성하기</h2>
      <FormProvider {...methods}>
        <form
          className='mb-5 flex flex-col gap-10 md:mb-6'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormField name='image'>
            {/* <FormLabel required>상품 이미지</FormLabel> */}
            <FormControl>
              {(field) => <FormImageUpload value={field.value} onChange={field.onChange} />}
            </FormControl>
            <FormHint />
          </FormField>
          <FormField name='name'>
            <FormLabel required>팀 이름</FormLabel>
            <FormInput placeholder='팀 이름을 입력해주세요.' type='text' />
            <FormHint />
          </FormField>

          <Button className='w-full' variant='primary'>
            생성하기
          </Button>
        </form>
      </FormProvider>
      <p
        id='description'
        className='text-xs-regular md:text-lg-regular text-text-default text-center'
      >
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요
      </p>
    </FormLayout>
  );
};

export default AddTeamForm;
