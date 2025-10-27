import { createContext, forwardRef, useContext } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

// CheckboxGroup Context
interface CheckboxGroupContextValue {
  name: string;
  error?: FieldError;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);
  if (!context) throw new Error('Checkbox must be used within CheckboxGroup');
  return context;
};

// CheckboxGroup 컴포넌트
interface CheckboxGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormCheckboxGroup = ({ children, className }: CheckboxGroupProps) => {
  const { name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  return (
    <CheckboxGroupContext.Provider value={{ name, error }}>
      <div
        className={`space-y-2 ${className || ''}`}
        aria-describedby={error ? `${name}-error` : undefined}
        role='group'
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

// CheckboxGroup용 Checkbox
interface CheckboxItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'> {
  value: string;
  children?: React.ReactNode;
}

export const FormCheckboxItem = forwardRef<HTMLInputElement, CheckboxItemProps>(
  ({ value, children, className, id, ...props }, ref) => {
    const { name } = useCheckboxGroup();
    const { register } = useFormContext();

    const { ref: registerRef, ...registerProps } = register(name);

    const checkboxId = id || `${name}-${value}`;

    return (
      <label
        className={`flex cursor-pointer items-center gap-2 ${className || ''}`}
        htmlFor={checkboxId}
      >
        <input
          id={checkboxId}
          type='checkbox'
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

FormCheckboxItem.displayName = 'FormCheckboxItem';

// 단일 Checkbox
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'> {
  children?: React.ReactNode;
}

export const FormCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, className, id, ...props }, ref) => {
    const { name } = useFormField();
    const { register } = useFormContext();

    const { ref: registerRef, ...registerProps } = register(name);

    const checkboxId = id || name;

    return (
      <label
        className={`flex cursor-pointer items-center gap-2 ${className || ''}`}
        htmlFor={checkboxId}
      >
        <input
          id={checkboxId}
          type='checkbox'
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

FormCheckbox.displayName = 'FormCheckbox';
