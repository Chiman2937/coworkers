import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface SelectContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  openedByKeyboard: boolean;
  setOpenedByKeyboard: Dispatch<SetStateAction<boolean>>;
  selectedValue: string;
  onValueChange: (value: string) => void;
  labelMap: Record<string, React.ReactNode>;
  setLabelMap: Dispatch<SetStateAction<Record<string, React.ReactNode>>>;
}

const SelectContext = createContext<SelectContextType | null>(null);

const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectContext must be used in Select Component');
  return context;
};

interface SelectProviderProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const Select = ({ children, value, onValueChange, placeholder }: SelectProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [labelMap, setLabelMap] = useState<Record<string, React.ReactNode>>({ '': placeholder });
  const [openedByKeyboard, setOpenedByKeyboard] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        if (openedByKeyboard) {
          triggerRef.current?.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, openedByKeyboard]);

  useEffect(() => {
    if (!isOpen) {
      setOpenedByKeyboard(false);
    }
  }, [isOpen]);

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        toggle,
        close,
        triggerRef,
        openedByKeyboard,
        setOpenedByKeyboard,
        selectedValue: value,
        onValueChange,
        labelMap,
        setLabelMap,
      }}
    >
      <div ref={dropdownRef} className='relative w-fit'>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
}

const SelectTrigger = ({ className, children }: TriggerProps) => {
  const { isOpen, toggle, triggerRef, setOpenedByKeyboard } = useSelect();

  const handleClick = () => {
    setOpenedByKeyboard(false);
    toggle();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenedByKeyboard(true);
      toggle();
    }
  };

  return (
    <button
      ref={triggerRef}
      className={className}
      aria-expanded={isOpen}
      aria-haspopup='true'
      type='button'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
};

interface ValueProps {
  className?: string;
}

const SelectValue = ({ className }: ValueProps) => {
  const { selectedValue, labelMap } = useSelect();
  return <div className={className}>{labelMap[selectedValue]}</div>;
};

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

const SelectList = ({ children, className }: ListProps) => {
  const { isOpen } = useSelect();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const items = listRef.current?.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>;
    const currentItem = listRef.current?.querySelector(
      '[role="option"][data-state="active"',
    ) as HTMLElement;
    if (!items || items.length === 0) return;

    currentItem?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = Array.from(items).findIndex((item) => item === document.activeElement);
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          items[nextIndex]?.focus();
          break;

        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          items[prevIndex]?.focus();
          break;

        case 'Home':
          event.preventDefault();
          items[0]?.focus();
          break;

        case 'End':
          event.preventDefault();
          items[items.length - 1]?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // if (!isOpen) return null;
  return (
    <ul
      ref={listRef}
      className={className}
      style={{ display: isOpen ? 'block' : 'none' }}
      role='listbox'
    >
      {children}
    </ul>
  );
};

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const SelectItem = ({ children, className, value }: ItemProps) => {
  const { close, setOpenedByKeyboard, triggerRef, selectedValue, onValueChange, setLabelMap } =
    useSelect();

  const selected = selectedValue === value;

  const handleClick = () => {
    onValueChange(value);
    close();
  };

  useEffect(() => {
    setLabelMap((prev) => ({ ...prev, [value]: children }));
  }, [children, setLabelMap, value]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenedByKeyboard(false);
      onValueChange(value);
      triggerRef.current?.focus();
      close();
    }
  };

  return (
    <li role='none'>
      <button
        className={className}
        aria-selected={selected}
        data-state={selected ? 'active' : 'inactive'}
        role='option'
        tabIndex={-1}
        type='button'
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {children}
      </button>
    </li>
  );
};

Select.trigger = SelectTrigger;
Select.value = SelectValue;
Select.list = SelectList;
Select.item = SelectItem;

export default Select;
