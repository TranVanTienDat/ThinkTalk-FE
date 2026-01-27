"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../common/Card";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Viezh Robert",
    location: "Warsaw, Poland",
    rating: 4.5,
    text: "“Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best”.",
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Yessica Christy",
    location: "Shanxi, China",
    rating: 4.5,
    text: "“I like it because I like to travel far and still can connect with high speed.”",
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    name: "Kim Young Jou",
    location: "Seoul, South Korea",
    rating: 4.5,
    text: "“This is very unusual for my business that currently requires a virtual private network that has high security.”",
    image: "https://i.pravatar.cc/150?u=3",
  },
  {
    name: "Damon Salvatore",
    location: "Mystic Falls, USA",
    rating: 5.0,
    text: "“Simply the best VPN service I have ever used. Fast, reliable and secure.”",
    image: "https://i.pravatar.cc/150?u=4",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(432);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 768) {
        setCardWidth(320 + 30);
      } else {
        setCardWidth(400 + 50);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B132A] mb-6 leading-tight">
            Trusted by Thousands of <br /> Happy Customer
          </h2>
          <p className="text-[#4F5665] leading-[30px] text-base">
            These are the stories of our customers who have joined us with great
            pleasure when using this crazy feature.
          </p>
        </div>

        <div className="relative mb-16 overflow-visible">
          <motion.div
            className="flex gap-[30px] md:gap-[50px]"
            animate={{ x: `-${currentIndex * cardWidth}px` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="min-w-[320px] md:min-w-[400px]">
                <Card
                  className={`h-full border-2 p-10 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-[#F53838] shadow-[0_20px_50px_rgba(13,16,37,0.05)]"
                      : "border-[#DDE0E4]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 relative shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#0B132A] text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-[#4F5665]">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-medium text-[#0B132A]">
                        {testimonial.rating}
                      </span>
                      <Star className="w-4 h-4 text-[#FEA250] fill-[#FEA250]" />
                    </div>
                  </div>
                  <p className="text-[#0B132A] leading-relaxed text-sm md:text-base text-left">
                    {testimonial.text}
                  </p>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-row items-center justify-between mt-12">
          <div className="flex gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-4 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-10 bg-[#F53838]" : "w-4 bg-[#DDE0E4]"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-5">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full border-2 border-[#F53838] flex items-center justify-center text-[#F53838] hover:bg-[#F53838] hover:text-white transition-all group"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full border-2 border-[#F53838] flex items-center justify-center text-[#F53838] hover:bg-[#F53838] hover:text-white transition-all group"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
