"use client";
import React from "react";
import { Card } from "../common/Card";
import { User, MapPin, Server } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: <User className="w-6 h-6 text-[#F53838]" />,
    value: "90+",
    label: "Users",
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#F53838]" />,
    value: "30+",
    label: "Locations",
  },
  {
    icon: <Server className="w-6 h-6 text-[#F53838]" />,
    value: "50+",
    label: "Servers",
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="relative -mt-24 md:-mt-32 z-10 px-4">
      <div className="container mx-auto max-w-[1140px]">
        <Card className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#EEEFF2] p-8 md:py-9">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-1 flex items-center justify-center gap-6 px-12 py-8 md:py-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#FFECEC] flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-[#0B132A] leading-tight">
                  {stat.value}
                </div>
                <div className="text-xl text-[#4F5665] leading-none mt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </Card>
      </div>
    </section>
  );
};
