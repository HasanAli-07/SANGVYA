import React from 'react';

interface LightInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const LightInput: React.FC<LightInputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1 text-left w-full">
      {label && (
        <label className="block font-semibold text-xs text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          className={`w-full bg-white border border-slate-300 text-slate-900 rounded-xl py-2.5 text-xs font-medium focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all ${
            icon ? 'pl-9 pr-3' : 'px-3'
          } ${error ? 'border-rose-500 ring-rose-500/20' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
};
