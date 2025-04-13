import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
            px-4 py-2 bg-white border rounded-md w-full focus:outline-none transition-colors
            ${error ? "border-error focus:ring-2 focus:ring-error/25" : "border-gray-300 focus:ring-2 focus:ring-primary/25"}
          `}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
