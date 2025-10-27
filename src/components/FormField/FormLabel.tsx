import { useFormField } from './FormField';

interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

const FormLabel = ({ children, required }: FormLabelProps) => {
  const { name } = useFormField();
  return (
    <label className='text-lg-medium text-text-primary mb-2 inline-block md:mb-3' htmlFor={name}>
      {required && <span className='mr-1 text-red-500'>*</span>}
      {children}
    </label>
  );
};

export default FormLabel;
