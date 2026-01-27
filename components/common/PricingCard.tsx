"use client";
import React from "react";
import Image from "next/image";
import { Card } from "./Card";
import { Button } from "./Button";
import { Check } from "lucide-react";

interface PricingCardProps {
  planName: string;
  price: string;
  features: string[];
  isHighlight?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  features,
  isHighlight = false,
}) => {
  return (
    <Card
      className={`flex flex-col items-center border-2 transition-all duration-300 px-6 py-12 md:px-12 md:py-20 h-full ${
        isHighlight
          ? "border-[#F53838] shadow-[0_20px_50px_rgba(245,56,56,0.1)]"
          : "border-[#DDE0E4] hover:border-[#F53838]"
      }`}
    >
      <div className="mb-8">
        <div className="w-[145px] h-[145px] flex items-center justify-center relative">
          <Image
            src="/images/pricing-box.png"
            alt={`${planName} Icon`}
            width={145}
            height={145}
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-lg font-bold text-[#0B132A] mb-8">{planName}</h3>
      <ul className="flex-1 space-y-4 mb-12 w-full text-left">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-4 text-[#4F5665] text-sm md:text-base"
          >
            <Check className="w-5 h-5 text-[#2FAB73] shrink-0" />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <div className="mb-6">
          <span className="text-2xl font-bold text-[#0B132A]">{price}</span>
          {price !== "Free" && (
            <span className="text-[#4F5665] text-lg"> / mo</span>
          )}
        </div>
        <Button
          variant={isHighlight ? "primary" : "outline"}
          size="md"
          className={`w-full max-w-[177px] ${!isHighlight ? "hover:shadow-[0_15px_40px_rgba(245,56,56,0.2)]" : ""}`}
        >
          Select Plan
        </Button>
      </div>
    </Card>
  );
};
