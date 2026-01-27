"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../common/Button";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Card } from "../common/Card";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8F8F8] pt-32 pb-16 relative">
      {/* Subscribe CTA Card */}
      <div className="container mx-auto px-4 md:px-12 absolute -top-[150px] left-0 right-0 z-10 max-w-[1140px]">
        <Card className="flex flex-col md:flex-row items-center justify-between p-12 md:px-16 md:py-[58px]">
          <div className="text-center md:text-left mb-8 md:mb-0 max-w-[400px]">
            <h2 className="text-3xl md:text-4xl font-medium text-[#0B132A] mb-4 leading-[45px]">
              Subscribe Now for <br className="hidden md:block" /> Get Special
              Features!
            </h2>
            <p className="text-[#4F5665] text-base">
              Let&apos;s subscribe with us and find the fun.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="px-16 py-4 shadow-[0_20px_50px_rgba(245,56,56,0.35)]"
          >
            Subscribe Now
          </Button>
        </Card>
      </div>

      <div className="container mx-auto px-4 md:px-12 mt-48 md:mt-[180px] max-w-[1140px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <Image
                src="/images/logo-icon.svg"
                alt="LaslesVPN Logo"
                width={35}
                height={35}
                className="w-8 h-auto"
              />
              <span className="text-xl font-bold text-[#0B132A]">
                Lasles<span className="font-extrabold">VPN</span>
              </span>
            </Link>
            <p className="text-[#4F5665] mb-8 max-w-[340px] leading-[30px] text-base">
              <span className="font-bold text-[#4F5665]">LaslesVPN</span> is a
              private network that has unique features and has high security.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-white shadow-[0_10px_20px_rgba(13,16,37,0.05)] flex items-center justify-center text-[#F53838] cursor-pointer hover:bg-[#F53838] hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
            <p className="text-[#AFB5C0] mt-12 text-sm font-medium">
              ©2024 LaslesVPN
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[#0B132A] font-bold text-lg mb-8">Product</h4>
            <ul className="space-y-4 text-[#4F5665]">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Download
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Server
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Countries
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[#0B132A] font-bold text-lg mb-8">Engage</h4>
            <ul className="space-y-4 text-[#4F5665]">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  LaslesVPN ?
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[#0B132A] font-bold text-lg mb-8">
              Earn Money
            </h4>
            <ul className="space-y-4 text-[#4F5665]">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Affiliate
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#F53838] transition-colors"
                >
                  Become Partner
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
