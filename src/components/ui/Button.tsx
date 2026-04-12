import * as React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-rose-600 text-white hover:bg-rose-700 shadow-xl shadow-rose-200/50 active:scale-95',
      secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:scale-95',
      outline: 'border-2 border-slate-100 bg-transparent hover:bg-slate-50 text-slate-700 hover:border-slate-200 active:scale-95',
      ghost: 'bg-transparent hover:bg-slate-50 text-slate-600 active:scale-95',
      danger: 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white active:scale-95 shadow-sm',
    };

    const sizes = {
      sm: 'h-10 px-6 text-sm font-black rounded-xl',
      md: 'h-14 px-8 text-base font-black rounded-2xl',
      lg: 'h-16 px-12 text-lg font-black rounded-2xl',
      icon: 'h-14 w-14 rounded-2xl',
    };

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/20 disabled:pointer-events-none disabled:opacity-50 tracking-tight cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="ml-3 h-5 w-5 animate-spin border-4 border-white/30 border-t-white rounded-full" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
