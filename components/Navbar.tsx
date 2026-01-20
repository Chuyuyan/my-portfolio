"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/projects", label: "Projects", sectionId: null },
  { href: "/experience", label: "Experience", sectionId: null },
  { href: "/contact", label: "Contact", sectionId: null },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state for navbar styling
      setIsScrolled(window.scrollY > 10);

      // Detect active section on home page
      if (pathname === "/") {
        const sections = ["home", "projects", "contact"];
        const scrollPosition = window.scrollY + 100; // Offset for navbar height

        let currentSection = "home";
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const offsetTop = element.offsetTop;
            if (scrollPosition >= offsetTop) {
              currentSection = sectionId;
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        // For other pages, use pathname
        const matchingItem = navItems.find((item) => item.href === pathname);
        setActiveSection(matchingItem?.sectionId || null);
      }
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const isActive = (item: typeof navItems[0]) => {
    if (pathname === "/" && item.sectionId) {
      return activeSection === item.sectionId;
    }
    return pathname === item.href;
  };

  return (
    <>
      <nav
        className={`w-full flex justify-between items-center px-8 py-4 fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border-b border-slate-200/40"
            : "bg-white/70 backdrop-blur-lg shadow-sm"
        }`}
      >
        <Link href="/" className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors group relative">
          <span className="relative">
            Chuyu Yan
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex space-x-6 text-gray-600">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-2 py-1 text-sm font-medium transition-colors group ${
                  isActive(item)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="relative">
                  {item.label}
                  {!isActive(item) && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
                  )}
                </span>
                {isActive(item) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/Chuyu Yan resume 2026-1-6.pdf"
              download="Chuyu-Yan-resume-2026-1-6.pdf"
              className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group relative"
            >
              <span className="relative">
                Resume
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
              </span>
            </a>
          </li>
        </ul>
        <ThemeToggle />
        </div>
      </nav>
    </>
  );
}