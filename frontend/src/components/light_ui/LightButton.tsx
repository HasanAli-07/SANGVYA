import React from 'react';

interface LightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'saffron' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const LightButton: React.FC<LightButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-slate-900',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold',
    saffron: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shadow-sm shadow-amber-500/20 border border-amber-600/30',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg min-h-[36px]',
    md: 'px-4 py-2 text-xs font-semibold rounded-xl min-h-[44px]',
    lg: 'px-5 py-3 text-sm font-bold rounded-2xl min-h-[48px]',
  };

  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};
