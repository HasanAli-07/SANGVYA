import React from 'react';

interface LightBadgeProps {
  children: React.ReactNode;
  variant?: 'saffron' | 'navy' | 'emerald' | 'rose' | 'slate';
  className?: string;
  icon?: React.ReactNode;
}

export const LightBadge: React.FC<LightBadgeProps> = ({
  children,
  variant = 'saffron',
  className = '',
  icon,
}) => {
  const variantStyles = {
    saffron: 'bg-amber-100 text-amber-800 border-amber-300',
    navy: 'bg-slate-100 text-slate-900 border-slate-300 font-bold',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold',
    rose: 'bg-rose-100 text-rose-800 border-rose-300',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
