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
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
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
        className={`w-full flex justify-between items-center px-4 sm:px-8 py-4 fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] border-b border-slate-200/40 dark:border-gray-800/60"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm"
        }`}
      >
        <Link href="/" className="text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group relative whitespace-nowrap">
          <span className="relative">
            Chuyu Yan
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 ease-out" />
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-6 text-gray-600 dark:text-gray-300">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative px-2 py-1 text-sm font-medium transition-colors group ${
                  isActive(item)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
              href="/Chuyu-Yan-Resume.pdf"
              download="Chuyu-Yan-Resume.pdf"
              className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors group relative"
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

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown panel */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 right-0 origin-top overflow-hidden transition-all duration-300 ease-out bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-gray-800/60 shadow-lg ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-2 py-3 text-base font-medium border-b border-slate-100 dark:border-gray-800 transition-colors ${
                    isActive(item)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/Chuyu-Yan-Resume.pdf"
                download="Chuyu-Yan-Resume.pdf"
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-3 text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
