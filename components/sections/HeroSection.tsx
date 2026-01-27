"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../common/Button";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section
      id="about"
      className="pt-32 pb-32 md:pt-48 md:pb-48 bg-white min-h-[90vh] flex items-center"
    >
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[550px]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[50px] font-medium text-[#0B132A] leading-[1.4] md:leading-[70px] mb-8">
              Want anything to be easy with <br />
              <span className="font-bold">LaslesVPN.</span>
            </h1>
            <p className="text-[#4F5665] text-base md:text-lg mb-12 leading-[30px]">
              Provide a network for all your needs with ease and fun using{" "}
              <span className="font-bold text-[#4F5665]">LaslesVPN</span>{" "}
              discover interesting features from us.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="px-16 py-4 rounded-xl shadow-[0_20px_50px_rgba(245,56,56,0.35)]"
            >
              Get Started
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full aspect-[6/5] max-w-[600px]">
              <Image
                src="/images/hero-illustration.png"
                alt="LaslesVPN Hero Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
