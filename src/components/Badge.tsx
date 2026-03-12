import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center justify-center text-[10px] sm:text-xs font-medium text-neutral-400 border border-neutral-300 px-2 py-1 rounded-full whitespace-nowrap tracking-wider ${className}`}>
      {children}
    </span>
  );
}
