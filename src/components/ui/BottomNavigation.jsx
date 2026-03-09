"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Calendar,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

const BottomNavigation = () => {
  const pathname = usePathname();

  // Navigation items with Home in the center
  const navItems = [
    {
      name: "Course Finder",
      href: "/ai-college-finder",
      icon: Search,
    },
    {
      name: "Events",
      href: "/events",
      icon: Calendar,
    },
    {
      name: "Home",
      href: "/",
      icon: null, // Will use logo instead
      isCenter: true,
    },
    {
      name: "Contact",
      href: "/contact-us",
      icon: MessageCircle,
    },
    {
      name: "FAQs",
      href: "/faqs",
      icon: HelpCircle,
    },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden behind bottom nav */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      {/* Bottom Navigation - Always visible */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden"
        aria-label="Mobile bottom navigation"
      >
        <div className="flex items-center justify-around h-16 px-1 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            // Center Home button with logo
            if (item.isCenter) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center flex-1 h-full relative -mt-6 z-10`}
                  aria-current={active ? "page" : undefined}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900 scale-110"
                        : "bg-white border-2 border-primary-800 hover:bg-primary-50"
                    }`}
                  >
                    <Image
                      src="/oec.png"
                      alt="OEC Dubai Home"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      active ? "text-amber-900" : "text-amber-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            }

            // Regular navigation items
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                  active
                    ? "text-amber-900"
                    : "text-gray-500 hover:text-primary-600"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <div className="relative">
                  <Icon
                    className={`h-6 w-6 ${
                      active ? "stroke-[2.5]" : "stroke-2"
                    }`}
                    aria-hidden="true"
                  />
                  {active && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-secondary-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    active ? "text-amber-900" : "text-amber-700"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Active indicator bar - only show for non-center items */}
        {(() => {
          const activeIndex = navItems.findIndex((item) => isActive(item.href));
          const activeItem = navItems[activeIndex];
          
          // Don't show indicator bar for center/home item
          if (activeItem?.isCenter) return null;
          
          return (
            <div
              className="absolute top-0 left-0 h-0.5 bg-secondary-500 transition-all duration-300"
              style={{
                width: `${100 / navItems.length}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
              aria-hidden="true"
            />
          );
        })()}
      </nav>
    </>
  );
};

export default BottomNavigation;
