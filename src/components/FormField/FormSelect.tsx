import Select from '../ui/Select';

interface FormSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  listMap: {
    value: string;
    children: React.ReactNode;
  }[];
  placeholder?: string;
}

const FormSelect = ({ value, onValueChange, listMap, placeholder }: FormSelectProps) => {
  return (
    <Select placeholder={placeholder} value={value} onValueChange={onValueChange}>
      <Select.trigger>
        <Select.value />
      </Select.trigger>
      <Select.list>
        {listMap.map(({ value, children }) => (
          <Select.item key={value} value={value}>
            {children}
          </Select.item>
        ))}
      </Select.list>
    </Select>
  );
};

export default FormSelect;
