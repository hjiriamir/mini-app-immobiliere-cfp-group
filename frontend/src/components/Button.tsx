import React from "react";
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow",
  secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 border border-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
  outline: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2.5 text-base rounded-lg",
  lg: "px-6 py-3 text-lg rounded-lg",
};

const Button: React.FC<ButtonProps> = ({ 
  variant = "primary", 
  size = "md",
  children, 
  className = "",
  loading = false,
  icon,
  disabled,
  ...props 
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon}
      {children}
    </button>
  );
};

export default Button;