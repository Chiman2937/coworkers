import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  open: (context: React.ReactNode) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used in ModalProvider');
  return context;
};

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode>(null);

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const lastInputTypeRef = useRef<'mouse' | 'keyboard'>('mouse');

  const open = (modalContent: React.ReactNode) => {
    setContent(modalContent);
    setIsOpen(true);
    if (lastInputTypeRef.current === 'keyboard') {
      previousFocusRef.current = document.activeElement as HTMLElement;
    } else {
      previousFocusRef.current = null;
    }
  };

  const close = () => {
    setContent(null);
    setIsOpen(false);
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  };

  useEffect(() => {
    const handleMouseDown = () => {
      lastInputTypeRef.current = 'mouse';
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ') {
        lastInputTypeRef.current = 'keyboard';
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // esc 입력 시 Modal close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  //Modal Open 상태일 시 body scroll 제거
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Modal Open 상태일 때 배경 요소들 무시
  useEffect(() => {
    if (!isOpen) return;
    const appRoot = document.getElementById('__next') || document.getElementById('root');
    if (appRoot) {
      appRoot.setAttribute('inert', '');
      appRoot.setAttribute('aria-hidden', 'true');
    }
    return () => {
      if (appRoot) {
        appRoot.removeAttribute('inert');
        appRoot.removeAttribute('aria-hidden');
      }
    };
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && content}
    </ModalContext.Provider>
  );
};

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: ModalContentProps) => {
  const { close } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // focus 처리
  useEffect(() => {
    if (!modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, [children]);

  return createPortal(
    <div
      className='fixed inset-0 z-9999 bg-black/50'
      aria-describedby='modal-description'
      aria-labelledby='modal-title'
      aria-modal='true'
      role='dialog'
      onClick={close}
    >
      <div
        ref={modalRef}
        className='fixed inset-0 flex items-center justify-center'
        onClick={(e) => e.stopPropagation()}
      >
        <div className={className}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

interface ModalTitleProps {
  children: string;
  className?: string;
}

export const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return (
    <h2 id='modal-title' className={className}>
      {children}
    </h2>
  );
};

interface ModalDescriptionProps {
  children: string;
  className?: string;
}

export const ModalDescription = ({ children, className }: ModalDescriptionProps) => {
  return (
    <p id='modal-description' className={className}>
      {children}
    </p>
  );
};

interface ModalCloseButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalCloseButton = ({ children, className }: ModalCloseButtonProps) => {
  const { close } = useModal();
  return (
    <button className={className} type='button' onClick={close}>
      {children}
    </button>
  );
};
