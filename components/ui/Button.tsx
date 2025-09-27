import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, children, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed relative overflow-hidden';
    
    const variants = {
      primary: 'btn-primary focus:ring-blue-500',
      secondary: 'btn-secondary focus:ring-gray-500',
      danger: 'btn-danger focus:ring-red-500',
      success: 'btn-success focus:ring-green-500',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500 px-4 py-2 rounded-lg',
      outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white focus:ring-blue-500 px-4 py-2 rounded-lg',
    };
    
    const sizes = {
      sm: 'px-3 py-2 text-sm rounded-lg',
      md: 'px-4 py-2.5 text-sm rounded-xl',
      lg: 'px-6 py-3 text-base rounded-xl',
      xl: 'px-8 py-4 text-lg rounded-2xl',
    };
    
    return (
      <button
        className={cn(
          baseClasses, 
          variants[variant], 
          sizes[size], 
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';