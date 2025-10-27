import React, { createContext, useContext } from 'react';

interface TabsContextType {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContext must be used in Tabs Component');
  return context;
};

interface TabsProviderProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

const Tabs = ({ children, value, onValueChange }: TabsProviderProps) => {
  return (
    <TabsContext.Provider value={{ selectedValue: value, onValueChange }}>
      {children}
    </TabsContext.Provider>
  );
};

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList = ({ children, className }: ListProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      tabs[nextIndex]?.focus();
      // tabs[nextIndex]?.click();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[nextIndex]?.focus();
      // tabs[nextIndex]?.click();
    }
  };

  return (
    <div className={className} role='tablist' onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

const TabsItem = ({ value, children, className }: ItemProps) => {
  const { onValueChange, selectedValue } = useTabs();
  const isSelected = value === selectedValue;

  return (
    <button
      className={className}
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
      role='tab'
      type='button'
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
};

Tabs.list = TabsList;
Tabs.item = TabsItem;

export default Tabs;
