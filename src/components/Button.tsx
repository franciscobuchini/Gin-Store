import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'icon' | 'small' | 'normal' | 'big';
  variant?: 'primary' | 'neutral' | 'success' | 'loading' | 'ghost' | 'outline';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  size = 'normal',
  variant = 'neutral',
  fullWidth = false,
  className = '', 
  ...props 
}: ButtonProps) {
  const baseClasses = "flex items-center justify-center gap-2 shrink-0 transition-colors font-semibold cursor-pointer";
  
  const sizeClasses = {
    icon: "p-2 rounded-lg",
    small: "h-[40px] px-4 text-sm rounded-xl",
    normal: "h-[56px] px-6 text-sm rounded-2xl gap-4", 
    big: "h-[76px] px-8 text-lg md:text-xl rounded-2xl gap-4", 
  };

  const widthClass = fullWidth ? "w-full" : "";

  const variantClasses = {
    primary: "bg-gold-500 hover:bg-gold-600 text-white",
    neutral: "bg-neutral-900 text-white hover:bg-gold-600",
    success: "bg-green-500 text-white !cursor-default",
    loading: "bg-neutral-200 text-neutral-500 !cursor-default",
    ghost: "bg-transparent text-neutral-500 hover:text-neutral-900 font-medium tracking-normal",
    outline: "bg-transparent border border-neutral-200 text-neutral-700 hover:border-gold-500 hover:text-gold-600",
  };

  const finalClasses = `${baseClasses} ${sizeClasses[size]} ${widthClass} ${variantClasses[variant]} ${className}`;

  return (
    <button className={finalClasses.trim()} {...props}>
      {children}
    </button>
  );
}
