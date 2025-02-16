"use client"; // This must be a client component

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Prevent hydration mismatch by ensuring component runs only after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />;
  }

  return resolvedTheme === "dark" ? (
    <FiSun
      onClick={() => setTheme("light")}
      className="cursor-pointer text-yellow-400"
      size={24}
    />
  ) : (
    <FiMoon
      onClick={() => setTheme("dark")}
      className="cursor-pointer text-white"
      size={24}
    />
  );
}
