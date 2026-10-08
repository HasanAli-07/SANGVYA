import React from 'react';

interface SdsCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 'flat' | 'hover' | 'raised';
  glassmorphism?: boolean;
}

export const SdsCard: React.FC<SdsCardProps> = ({
  children,
  className = '',
  elevation = 'flat',
  glassmorphism = true,
}) => {
  const elevationStyles = {
    flat: 'border border-slate-800 bg-slate-900/90',
    hover: 'border border-slate-800 bg-slate-900/90 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200',
    raised: 'border border-indigo-500/30 bg-slate-900 shadow-xl shadow-indigo-950/40',
  };

  const glassStyle = glassmorphism ? 'backdrop-blur-md backdrop-saturate-150' : '';

  return (
    <div
      className={`rounded-2xl p-5 ${elevationStyles[elevation]} ${glassStyle} ${className}`}
    >
      {children}
    </div>
  );
};
