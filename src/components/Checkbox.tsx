import React from 'react';
import { Check } from 'lucide-react';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = '', ...props }, ref) => {
    return (
      <label htmlFor={id} className={`flex items-start gap-3 group cursor-pointer ${className}`}>
        <div className="relative pt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            className="peer w-5 h-5 opacity-0 absolute inset-0 cursor-pointer z-10"
            {...props}
          />
          <div className="w-5 h-5 rounded-[0.4rem] border-2 border-neutral-300 bg-white text-transparent flex items-center justify-center transition-all duration-200 peer-checked:bg-gold-500 peer-checked:border-gold-500 peer-checked:text-white group-hover:border-gold-400 peer-focus-visible:ring-4 peer-focus-visible:ring-gold-500/20 peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100">
            <Check 
              className="w-3.5 h-3.5 transition-all duration-300 transform scale-50 opacity-0"
              strokeWidth={4}
            />
          </div>
        </div>
        <span className="text-xs md:text-sm text-neutral-600  group-hover:text-neutral-900 transition-colors select-none pt-[2px]">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
