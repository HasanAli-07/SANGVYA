import React from 'react';

interface LightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  bordered?: boolean;
}

export const LightCard: React.FC<LightCardProps> = ({
  children,
  className = '',
  onClick,
  bordered = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 ${
        bordered ? 'border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300' : 'shadow-sm'
      } transition-all duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
