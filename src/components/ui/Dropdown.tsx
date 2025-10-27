import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  openedByKeyboard: boolean;
  setOpenedByKeyboard: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownContext must be used in Dropdown Component');
  return context;
};

interface DropdownProviderProps {
  children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <DropdownContext.Provider
      value={{ isOpen, toggle, close, triggerRef, openedByKeyboard, setOpenedByKeyboard }}
    >
      <div ref={dropdownRef} className='relative w-fit'>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownTrigger = ({ className, children }: TriggerProps) => {
  const { isOpen, toggle, triggerRef, setOpenedByKeyboard } = useDropdown();

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

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

const DropdownList = ({ children, className }: ListProps) => {
  const { isOpen } = useDropdown();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const items = listRef.current?.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLElement>;
    if (!items || items.length === 0) return;

    items[0]?.focus();

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

  if (!isOpen) return null;
  return (
    <ul ref={listRef} className={className} role='menu'>
      {children}
    </ul>
  );
};

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const DropdownItem = ({ children, className, onClick }: ItemProps) => {
  const { close, setOpenedByKeyboard, triggerRef } = useDropdown();

  const handleClick = () => {
    onClick?.();
    close();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpenedByKeyboard(false);
      triggerRef.current?.focus();
      onClick?.();
      close();
    }
  };

  return (
    <li role='none'>
      <button
        className={className}
        role='menuitem'
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

Dropdown.trigger = DropdownTrigger;
Dropdown.list = DropdownList;
Dropdown.item = DropdownItem;

export default Dropdown;
