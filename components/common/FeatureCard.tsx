import React from "react";
import { Card } from "./Card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card hover className="text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center">{icon}</div>
        <h3 className="text-lg font-medium text-[#0B132A]">{title}</h3>
        <p className="text-[#4F5665] text-sm leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};
