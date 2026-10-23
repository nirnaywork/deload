// This context shares one dialog's open/close controls with buttons anywhere in the page tree.
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

// Context is like a shared noticeboard: nested components can read the same state without long prop chains.
const FormContext = createContext(null);

// The provider stores whether the shared form dialog is open and exposes actions to its children.
export function FormProvider({ children }) {
  // State is React's memory for values that should cause the page to update when they change.
  const [isOpen, setIsOpen] = useState(false);
  // This ref remembers which button opened the dialog so focus can return there after closing.
  const triggerRef = useRef(null);

  // Stable callbacks keep consumers from receiving new function objects on every render.
  const openForm = useCallback((event) => {
    triggerRef.current = event?.currentTarget || document.activeElement;
    setIsOpen(true);
  }, []);
  const closeForm = useCallback(() => setIsOpen(false), []);
  // Memo keeps the shared context object stable unless one of its changing values changes.
  const value = useMemo(() => ({ isOpen, openForm, closeForm, triggerRef }), [isOpen, openForm, closeForm]);

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

// This custom hook gives components a short, consistent way to use the form controls.
export function useFormDialog() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormDialog must be used inside FormProvider.');
  }
  return context;
}
