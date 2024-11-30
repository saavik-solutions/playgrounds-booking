import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, showPassword, onTogglePassword, ...props }, ref) => {
    const isPassword = type === 'password';

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-base font-medium text-gray-700">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            className={clsx(
              'w-full px-4 py-3 text-base sm:text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0053a7] focus:border-transparent',
              'transition-all duration-200',
              {
                'border-red-500 focus:ring-red-500': error,
                'border-gray-300': !error,
                'pr-12': isPassword,
              },
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

// Add the display name
Input.displayName = 'Input';
