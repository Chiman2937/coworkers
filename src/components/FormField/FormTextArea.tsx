import { forwardRef } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCount?: boolean;
}
const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ showCount = false, maxLength, ...props }, ref) => {
    const { name } = useFormField();
    const {
      register,
      formState: { errors },
      watch,
    } = useFormContext();

    const error = errors[name] as FieldError | undefined;
    const { ref: registerRef, ...registerProps } = register(name);

    const currentValue = watch(name) || '';
    const currentLength = String(currentValue).length;

    return (
      <div>
        <textarea
          aria-invalid={!!error}
          id={name}
          className=''
          aria-describedby={error ? `${name}-error` : undefined}
          maxLength={maxLength}
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
        {showCount && maxLength && (
          <div className='mt-1 text-right text-sm text-gray-500'>
            {currentLength} / {maxLength}
          </div>
        )}
      </div>
    );
  },
);

FormTextArea.displayName = 'FormTextArea';

export default FormTextArea;
