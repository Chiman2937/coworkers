import Image from 'next/image';

import IconEdit from '@/assets/icons/icon_edit.svg';

import { ImageUpload, ImageUploadProps } from '../ui/ImageUpload';

type ImageUploadPropsWithoutChildren = Omit<ImageUploadProps, 'children'>;

const FormImageUpload = ({ value, onChange, initialImages }: ImageUploadPropsWithoutChildren) => {
  return (
    <ImageUpload
      initialImages={initialImages}
      maxFiles={1}
      mode='replace'
      multiple={false}
      value={value}
      onChange={onChange}
    >
      {(images, _removeImage, openFileDialog) => (
        <div className='flex justify-center'>
          {Object.entries(images).map(([url, _file]) => (
            <div key={url} className='relative size-16 md:size-25'>
              <Image
                className='border-border-primary rounded-5x h-full w-full border-[2.22px] object-cover md:rounded-4xl'
                alt='팀 이미지'
                fill
                src={url}
              />
              {/* <button
                className='absolute top-0 left-0 flex size-6 items-center justify-center rounded-full bg-black'
                type='button'
                onClick={() => removeImage(url)}
              >
                <IconDelete className='size-5' />
              </button> */}
              <button
                className='absolute -right-3 -bottom-3 cursor-pointer'
                aria-label='팀 이미지 수정 버튼'
                type='button'
                onClick={openFileDialog}
              >
                <IconEdit className='size-10' />
              </button>
            </div>
          ))}
        </div>
      )}
    </ImageUpload>
  );
};

export default FormImageUpload;
