import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-full transition-all duration-300 inline-flex items-center justify-center";

  const variants = {
    primary:
      "bg-[#F53838] text-white hover:bg-white hover:text-[#F53838] border-2 border-[#F53838] shadow-[0_15px_40px_rgba(245,56,56,0.35)]",
    outline:
      "border-2 border-[#F53838] text-[#F53838] hover:bg-[#F53838] hover:text-white hover:shadow-[0_15px_40px_rgba(245,56,56,0.3)]",
    ghost: "text-[#0B132A] font-medium hover:text-[#F53838]",
  };

  const sizes = {
    sm: "px-8 py-2 text-sm",
    md: "px-10 py-3 text-base",
    lg: "px-16 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
