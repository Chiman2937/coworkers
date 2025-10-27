import { FieldError, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

interface FormHintProps {
  className?: string;
}

const FormHint = ({ className }: FormHintProps) => {
  const { name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  if (!error?.message) return null;

  return (
    <p id={`${name}-error`} className={className}>
      {error.message}
    </p>
  );
};

export default FormHint;
