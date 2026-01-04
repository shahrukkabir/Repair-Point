import React from "react";
import { FiLoader } from "react-icons/fi";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-103 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer";

  const variantClasses = {
    primary: "bg-primary hover:bg-secondary text-white",
    secondary: "bg-secondary hover:bg-primary text-white",
    outline:
      "bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white",
    danger:
      "bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    ghost: "bg-transparent hover:bg-base-200 text-base-content",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${widthClass}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const renderIcon = () => {
    if (!icon) return null;
    return React.cloneElement(icon, { className: "w-4 h-4" });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <FiLoader className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === "left" && renderIcon()}
        {children}
        {icon && iconPosition === "right" && renderIcon()}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
