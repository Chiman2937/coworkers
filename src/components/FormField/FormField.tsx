import { createContext, useContext } from 'react';

interface FormFieldContextType {
  name: string;
}
const FormFieldContext = createContext<FormFieldContextType | null>(null);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) throw new Error('useFormField must be used in FormField Component');
  return context;
};

interface FormFieldProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}

const FormField = ({ name, children, className }: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <div className={className}>{children}</div>
    </FormFieldContext.Provider>
  );
};

export default FormField;
