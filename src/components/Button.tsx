import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => Promise<void> | void;
  children: ReactNode;
  isDisabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

export default function Button({
  onClick,
  children,
  isDisabled,
  variant = "primary",
  size = "medium",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${
    sizeStyles[size]
  } ${className || ""}`;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}
