import 'react-day-picker/dist/style.css';

import React, {
  ButtonHTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  DayButton,
  DayButtonProps,
  DayPicker,
  DayProps,
  useDayPicker,
  WeekdayProps,
} from 'react-day-picker';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import IconArrow from '@/assets/icons/icon_arrow_down.svg';
import { cn } from '@/lib/utils';

interface FormDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  children: React.ReactNode;
}

interface DatePickerContextType {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DatePickerContext = createContext<DatePickerContextType | null>(null);

const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);
  if (!context) {
    throw new Error('DatePicker components must be used within FormDatePicker');
  }
  return context;
};

// Root Component
const FormDatePicker = ({ value, onChange, children }: FormDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DatePickerContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div ref={containerRef} className='relative'>
        {children}
      </div>
    </DatePickerContext.Provider>
  );
};

// Trigger Component
interface TriggerProps {
  placeholder?: string;
  className?: string;
}

const Trigger = ({ placeholder, className }: TriggerProps) => {
  const { value, isOpen, setIsOpen } = useDatePickerContext();

  return (
    <button
      className={cn(
        'flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left hover:border-gray-400',
        className,
      )}
      type='button'
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className={value ? 'text-gray-900' : 'text-gray-500'}>
        {value ? format(value, 'yyyy년 MM월 dd일', { locale: ko }) : placeholder}
      </span>
    </button>
  );
};

// Content Component
interface ContentProps {
  className?: string;
}

const Content = ({ className }: ContentProps) => {
  const { value, onChange, isOpen, setIsOpen } = useDatePickerContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'px-11 py-4',
        'absolute z-50',
        'rounded-3x border-interaction-hover border-1 bg-white',
        className,
      )}
    >
      <DayPicker
        showOutsideDays
        classNames={{
          root: 'p-0',
          months: 'flex flex-col relative',
          month: 'relative',
          weekdays: 'flex w-full',
          week: 'flex w-full',
        }}
        components={{
          Nav: CustomNav,
          DayButton: CustomDayButton,
          MonthCaption: EmptyCaption,
          Weekday: CustomWeekday,
          Day: CustomDay,
        }}
        fixedWeeks
        locale={ko}
        mode='single'
        selected={value}
        onSelect={(date) => {
          onChange(date);
          setIsOpen(false);
        }}
      />
    </div>
  );
};

FormDatePicker.Trigger = Trigger;
FormDatePicker.Content = Content;

export default FormDatePicker;

const EmptyCaption = () => {
  return <></>;
};

const CustomNav = () => {
  const { previousMonth, nextMonth, goToMonth, months } = useDayPicker();
  const currentMonth = months[0];

  return (
    <nav className='mb-2 flex h-9 items-center justify-between'>
      <CustomNavButton
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <IconArrow className='size-6 rotate-90' />
      </CustomNavButton>

      <div className='text-md-medium text-text-primary font-semibold'>
        {format(currentMonth.date, 'yyyy년 MM월', { locale: ko })}
      </div>

      <CustomNavButton disabled={!nextMonth} onClick={() => nextMonth && goToMonth(nextMonth)}>
        <IconArrow className='size-6 rotate-270' />
      </CustomNavButton>
    </nav>
  );
};

const CustomNavButton = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'h-8 w-8',
        'inline-flex items-center justify-center',
        'cursor-pointer rounded-md bg-transparent hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30',
        'text-text-primary disabled:text-text-disabled',
      )}
      type='button'
      {...props}
    >
      {children}
    </button>
  );
};

const CustomWeekday = (props: WeekdayProps) => {
  return (
    <th
      className={cn(
        'h-8 w-9',
        'flex items-center justify-center',
        'text-md-medium text-text-disabled',
      )}
    >
      {props.children}
    </th>
  );
};

const CustomDay = (props: DayProps) => {
  return (
    <td
      className={cn(
        'h-8 w-9',
        'relative',
        'flex items-center justify-center text-center',
        'text-md-regular',
      )}
    >
      {props.children}
    </td>
  );
};

const CustomDayButton = (props: DayButtonProps) => {
  const { day, modifiers, ...buttonProps } = props;

  return (
    <DayButton
      {...buttonProps}
      className={cn(
        'rounded-2x h-8 w-9',
        'inline-flex items-center justify-center',
        'font-md-regular text-md-regular text-text-primary cursor-pointer',
        !modifiers.selected && 'hover:bg-gray-100',
        modifiers.selected && 'text-background-primary bg-brand-primary',
        modifiers.today && !modifiers.selected && 'text-brand-primary',
        modifiers.outside && 'text-gray-300',
      )}
      day={day}
      modifiers={modifiers}
    />
  );
};
