import React from 'react';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: 'text' | 'email' | 'tel' | 'number' | 'password';
  label: string;
  placeholder: string; // Obligatorio para inputs de texto
};

type RangeProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type: 'range';
  label: string;
  placeholder?: string; // Opcional para rangos
};

type InputProps = TextInputProps | RangeProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className = '', type = 'text', placeholder, ...props }, ref) => {
    
    if (type === 'range') {
      return (
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor={id} className="text-sm font-medium text-neutral-700">
            {label}
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              id={id}
              ref={ref}
              className={`w-full accent-gold-500 ${className}`}
              {...props}
            />
          </div>
        </div>
      );
    }

    // Default text/email/tel inputs
    return (
      <div className="flex flex-col w-full">
        <label htmlFor={id} className="m-2 text-sm font-medium text-neutral-700">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`bg-white border rounded-xl px-4 py-2 outline-none focus:border-gold-500 transition-all text-neutral-900 caret-neutral-900 placeholder:text-neutral-300 w-full ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
