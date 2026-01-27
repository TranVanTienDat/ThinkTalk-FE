"use client";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Powerfull online protection.",
  "Internet without borders.",
  "Supercharged VPN",
  "No specific time limits.",
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12 max-w-[1140px]">
        <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-full aspect-square max-w-[500px]">
              <Image
                src="/images/features-illustration.png"
                alt="LaslesVPN Features Illustration"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-[#0B132A] leading-[1.4] md:leading-[50px] mb-6 max-w-[400px]">
              We Provide Many Features You Can Use
            </h2>
            <p className="text-[#4F5665] mb-8 leading-[30px] text-base">
              You can explore the features that we provide with fun and have
              their own functions each feature.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 text-[#4F5665] text-sm md:text-base font-medium"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#2FAB73] shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
