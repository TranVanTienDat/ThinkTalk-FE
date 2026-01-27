"use client";
import React from "react";
import { PricingCard } from "../common/PricingCard";
import { motion } from "framer-motion";

const plans = [
  {
    planName: "Free Plan",
    price: "Free",
    features: [
      "Unlimited Bandwitch",
      "Encrypted Connection",
      "No Traffic Logs",
      "Works on All Devices",
    ],
    isHighlight: false,
  },
  {
    planName: "Standard Plan",
    price: "$9",
    features: [
      "Unlimited Bandwitch",
      "Encrypted Connection",
      "No Traffic Logs",
      "Works on All Devices",
      "Connect Anyware",
    ],
    isHighlight: false,
  },
  {
    planName: "Premium Plan",
    price: "$12",
    features: [
      "Unlimited Bandwitch",
      "Encrypted Connection",
      "No Traffic Logs",
      "Works on All Devices",
      "Connect Anyware",
      "Get New Features",
    ],
    isHighlight: true,
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#F8F8F8]">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B132A] mb-4">
            Choose Your Plan
          </h2>
          <p className="text-[#4F5665] leading-relaxed">
            Let&apos;s choose the package that is best for you and explore it
            happily and cheerfully.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PricingCard {...plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
