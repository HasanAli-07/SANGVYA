import React from 'react';

interface SdsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'voice';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const SdsButton: React.FC<SdsButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500/30',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
    accent: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20',
    ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
    voice: 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white shadow-xl shadow-amber-500/30 font-bold',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg min-h-[36px]',
    md: 'px-4 py-2.5 text-xs font-semibold rounded-xl min-h-[44px]',
    lg: 'px-5 py-3.5 text-sm font-bold rounded-2xl min-h-[48px]', // Touch target >= 48px
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};
