import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'neutral' | 'gold' | 'success' | 'danger';
}

export default function Badge({ 
  children, 
  className = '', 
  variant = 'neutral' 
}: BadgeProps) {
  const variants: Record<string, string> = {
    neutral: 'text-neutral-400 border border-neutral-300',
    gold: 'bg-gold-300/90 backdrop-blur-sm text-black border-0 shadow-lg shadow-gold-500/20  font-bold',
    success: 'bg-green-50 text-green-700 border border-green-200 font-bold',
    danger: 'bg-red-500 text-white font-bold'
  };

  return (
    <span className={`inline-flex items-center justify-center text-[10px] sm:text-xs px-2.5 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
