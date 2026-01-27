"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const NetworkSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B132A] mb-4">
            Huge Global Network of Fast VPN
          </h2>
          <p className="text-[#4F5665] leading-relaxed">
            See LaslesVPN everywhere to make it easier for you when you move
            locations.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-[2/1] overflow-hidden flex items-center justify-center mb-16"
        >
          <Image
            src="/images/network-map.png"
            alt="LaslesVPN Global Network Map"
            fill
            className="object-contain"
          />

          {/* Decorative dots to represent servers */}
          {[
            { top: "20%", left: "20%" },
            { top: "40%", left: "45%" },
            { top: "60%", left: "70%" },
            { top: "30%", left: "80%" },
            { top: "70%", left: "15%" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-[#F53838] rounded-full shadow-[0_0_15px_#F53838]"
              style={pos}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </motion.div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {["Netflix", "Reddit", "Amazon", "Discord", "Spotify"].map(
            (partner) => (
              <span
                key={partner}
                className="text-2xl font-bold text-[#0B132A] cursor-default"
              >
                {partner}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
