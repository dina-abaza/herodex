import * as React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-black text-slate-700 block mr-1 tracking-tight"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-14 w-full rounded-2xl border-none bg-slate-50 px-5 py-4 text-base font-bold text-slate-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/20 focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300',
            error && 'ring-2 ring-rose-500/20 bg-rose-50/30',
            className
          )}
          id={id}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs font-bold text-rose-500 mt-1 mr-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
