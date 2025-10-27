import { useFormField } from './FormField';

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

const FormLabel = ({ children, className, required }: FormLabelProps) => {
  const { name } = useFormField();
  return (
    <label className={className} htmlFor={name}>
      {required && <span className='mr-1 text-red-500'>*</span>}
      {children}
    </label>
  );
};

export default FormLabel;
