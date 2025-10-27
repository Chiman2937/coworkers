import React, { useEffect, useRef, useState } from 'react';

export type ImageRecord = Record<string, File | null>;

export interface ImageUploadProps {
  value?: ImageRecord;
  children: (
    images: ImageRecord,
    removeImage: (url: string) => void,
    openFileDialog: () => void,
  ) => React.ReactNode;
  onChange?: (images: ImageRecord) => void;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
  mode?: 'replace' | 'append';
  initialImages?: string[];
}

export const ImageUpload = ({
  value,
  children,
  onChange,
  maxFiles = 1,
  accept = 'image/*',
  multiple = false,
  mode = 'replace',
  initialImages = [],
}: ImageUploadProps) => {
  const [internalImages, setInternalImages] = useState<ImageRecord>(() => {
    // initialImages 처리
    return initialImages.reduce((acc, url) => {
      acc[url] = null;
      return acc;
    }, {} as ImageRecord);
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined && onChange !== undefined;
  const images = isControlled ? value : internalImages;

  useEffect(() => {
    return () => {
      Object.keys(images).forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [images]);

  const updateImages = (newImages: ImageRecord) => {
    if (!isControlled) {
      setInternalImages(newImages);
    }
    onChange?.(newImages);
  };

  const addImages = (files: File[]) => {
    const newImages: ImageRecord = {};

    files.forEach((file) => {
      const url = URL.createObjectURL(file);
      newImages[url] = file;
    });

    const updatedImages = mode === 'append' ? { ...images, ...newImages } : newImages;

    const entries = Object.entries(updatedImages);
    const limitedImages = entries.slice(0, maxFiles).reduce((acc, [url, file]) => {
      acc[url] = file;
      return acc;
    }, {} as ImageRecord);

    updateImages(limitedImages);
  };

  const removeImage = (url: string) => {
    if (url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }

    const newImages = { ...images };
    delete newImages[url];

    updateImages(newImages);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addImages(files);
    e.target.value = '';
  };

  return (
    <>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
        type='file'
        onChange={handleFileChange}
      />
      {children(images, removeImage, openFileDialog)}
    </>
  );
};
