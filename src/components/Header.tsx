"use client";
import { FiAlignLeft } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";
import Link from "next/link";

import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/accounts", label: "Accounts" },
    { href: "/test", label: "TEST" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-gray-100">
      <nav className="text-gray-500">
        <section className="h-14 px-4 flex items-center">
          <button className="text-zinc-700" onClick={toggleMenu}>
            <FiAlignLeft size={36} />
          </button>
        </section>
      </nav>

      {/* Background overlay for blur */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 transition-opacity duration-300"
          onClick={closeMenu} // Close menu when the overlay is clicked
        ></div>
      )}

      {/* Menu with navigation links */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } z-20`}
      >
        <div className="flex justify-between items-center p-4">
          {/* Close button (X icon) */}
          <button onClick={closeMenu} className="text-gray-700">
            <HiOutlineX size={24} />
          </button>
        </div>
        <ul className="flex flex-col items-start p-4 space-y-4">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-lg text-gray-700 hover:text-gray-900"
                onClick={closeMenu} // Close menu when a link is clicked
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
