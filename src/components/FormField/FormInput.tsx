import { forwardRef, useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import IconInvisible from '@/assets/icons/icon_visible_false.svg';
import IconVisible from '@/assets/icons/icon_visible_true.svg';
import { cn } from '@/lib/utils';

import { useFormField } from './FormField';

// interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ type, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const { name } = useFormField();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;
  const { ref: registerRef, ...registerProps } = register(name);

  const nextType = isVisible ? 'text' : type;

  const passwordIconMap = {
    false: IconInvisible,
    true: IconVisible,
  };

  const IconEye = passwordIconMap[`${isVisible}`];

  const handlePasswordIconClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className='relative'>
      <input
        aria-invalid={!!error}
        id={name}
        className={cn(
          'smooth-color w-full',
          'text-md-regular px-4 py-[13.5px]',
          'md:text-lg-regular md:py-[14.5px]',
          'placeholder:text-text-default text-text-primary',
          'bg-background-primary rounded-3x border-border-primary border-1 outline-0',
          'hover:border-brand-primary focus:border-brand-tertiary',
          error && 'border-status-danger',
        )}
        aria-describedby={error ? `${name}-error` : undefined}
        type={nextType}
        {...registerProps}
        {...props}
        ref={(e) => {
          registerRef(e);
          if (typeof ref === 'function') {
            ref(e);
          } else if (ref) {
            ref.current = e;
          }
        }}
      />
      {type === 'password' && (
        <button
          className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer'
          type='button'
          onClick={handlePasswordIconClick}
        >
          <IconEye className='size-5' />
        </button>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
