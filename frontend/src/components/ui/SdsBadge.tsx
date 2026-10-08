import React from 'react';

interface SdsBadgeProps {
  children: React.ReactNode;
  status?: 'active' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
  icon?: React.ReactNode;
}

export const SdsBadge: React.FC<SdsBadgeProps> = ({
  children,
  status = 'info',
  className = '',
  icon,
}) => {
  const statusStyles = {
    active: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    error: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    info: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${statusStyles[status]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
