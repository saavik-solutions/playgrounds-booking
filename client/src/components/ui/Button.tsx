import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          'text-base sm:text-lg',
          {
            'bg-gradient-to-r from-[#0053a7] to-[#0077b6] text-white shadow-lg hover:shadow-xl focus:ring-[#0053a7]':
              variant === 'primary',
            'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200':
              variant === 'secondary',
            'border-2 border-[#0053a7] text-[#0053a7] hover:bg-[#0053a7] hover:text-white':
              variant === 'outline',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

// Add the display name
Button.displayName = 'Button';
