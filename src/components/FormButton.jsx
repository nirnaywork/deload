// FormButton standardizes the playful CTA style and always opens the one shared contact form.
import { ArrowUpRight } from 'lucide-react';
import { useFormDialog } from './FormContext.jsx';

// Children are the visible button label; className lets a section choose a visual color variant.
function FormButton({ children, className = '', showArrow = true, ...buttonProps }) {
  const { openForm } = useFormDialog();

  return (
    <button className={`button button--primary ${className}`} onClick={openForm} type="button" {...buttonProps}>
      <span>{children}</span>
      {showArrow && <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.5} />}
    </button>
  );
}

export default FormButton;
