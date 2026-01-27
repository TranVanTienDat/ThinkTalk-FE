"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../common/Button";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Help", href: "#help" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between max-w-[1240px]">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-icon.svg"
            alt="LaslesVPN Logo"
            width={35}
            height={35}
            className="w-8 h-auto"
          />
          <span className="text-xl font-bold text-[#0B132A] tracking-tight">
            Lasles<span className="font-extrabold text-[#0B132A]">VPN</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#4F5665] hover:text-[#F53838] transition-colors text-[16px] font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <button className="text-[#0B132A] font-bold hover:text-[#F53838] transition-colors text-[16px]">
            Sign In
          </button>
          <Button
            variant="outline"
            size="sm"
            className="px-8 py-2.5 text-[16px] font-bold"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
