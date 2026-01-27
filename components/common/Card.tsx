import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => {
  const hoverStyles = hover
    ? "hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(13,16,37,0.1)] cursor-pointer"
    : "";

  return (
    <div
      className={`bg-white rounded-xl shadow-[0_20px_50px_rgba(13,16,37,0.05)] transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
};
