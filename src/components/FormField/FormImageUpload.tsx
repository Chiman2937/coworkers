import { ImageUpload, ImageUploadProps } from '../ui/ImageUpload';

type ImageUploadPropsWithoutChildren = Omit<ImageUploadProps, 'children'>;

const FormImageUpload = ({
  value,
  onChange,
  maxFiles,
  accept,
  multiple,
  mode,
  initialImages,
}: ImageUploadPropsWithoutChildren) => {
  return (
    <ImageUpload
      accept={accept}
      initialImages={initialImages}
      maxFiles={maxFiles}
      mode={mode}
      multiple={multiple}
      value={value}
      onChange={onChange}
    >
      {(images, removeImage, openFileDialog) => (
        <>
          {Object.entries(images).map(([url, _file]) => (
            <div key={url} className='relative h-32 w-32'>
              <img className='h-full w-full object-cover' alt='' src={url} />
              <button className='absolute top-0 left-0' onClick={() => removeImage(url)}>
                ×
              </button>
            </div>
          ))}
          <button onClick={openFileDialog}>이미지 등록</button>
        </>
      )}
    </ImageUpload>
  );
};

export default FormImageUpload;
