import { createContext, forwardRef, useContext } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

// RadioGroup Context
interface RadioGroupContextValue {
  name: string;
  error?: FieldError;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error('Radio must be used within RadioGroup');
  return context;
};

// RadioGroup 컴포넌트
interface RadioGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormRadioGroup = ({ children, className }: RadioGroupProps) => {
  const { name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <RadioGroupContext.Provider value={{ name, error }}>
      <div
        aria-invalid={!!error}
        className={`space-y-2 ${className || ''}`}
        aria-describedby={error ? `${name}-error` : undefined}
        role='radiogroup'
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// Radio 컴포넌트
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'> {
  value: string;
  children?: React.ReactNode;
}

export const FormRadio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, children, className, id, ...props }, ref) => {
    const { name } = useRadioGroup();
    const { register } = useFormContext();

    const { ref: registerRef, ...registerProps } = register(name);

    const radioId = id || `${name}-${value}`;

    return (
      <label
        className={`flex cursor-pointer items-center gap-2 ${className || ''}`}
        htmlFor={radioId}
      >
        <input
          id={radioId}
          type='radio'
          value={value}
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
          className='h-4 w-4 cursor-pointer'
        />
        {children && <span className='text-sm'>{children}</span>}
      </label>
    );
  },
);

FormRadio.displayName = 'FormRadio';
