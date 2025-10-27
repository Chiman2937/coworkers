import { FieldError, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

// interface FormHintProps {
//   className?: string;
// }

const FormHint = () => {
  const { name } = useFormField();
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name] as FieldError | undefined;

  if (!error?.message) return null;

  return (
    <p id={`${name}-error`} className='text-md-medium text-status-danger mt-3 md:mt-2'>
      {error.message}
    </p>
  );
};

export default FormHint;
