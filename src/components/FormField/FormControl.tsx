import { Controller, ControllerRenderProps, useFormContext } from 'react-hook-form';

import { useFormField } from './FormField';

interface FormControlProps {
  children: (field: ControllerRenderProps) => React.ReactNode;
}

export const FormControl = ({ children }: FormControlProps) => {
  const { name } = useFormField();
  const { control } = useFormContext();

  return (
    <Controller control={control} name={name} render={({ field }) => <>{children(field)}</>} />
  );
};
