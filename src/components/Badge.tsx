import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'neutral' | 'gold' | 'success';
}

export default function Badge({ 
  children, 
  className = '', 
  variant = 'neutral' 
}: BadgeProps) {
  const variants = {
    neutral: 'text-neutral-400 border border-neutral-300',
    gold: 'bg-gold-500/90 backdrop-blur-sm text-white border-0 shadow-lg shadow-gold-500/20 uppercase font-bold',
    success: 'bg-green-50 text-green-700 border border-green-200 uppercase font-bold'
  };

  return (
    <span className={`inline-flex items-center justify-center text-[10px] sm:text-xs px-2.5 py-1 rounded-full whitespace-nowrap tracking-wider transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
