"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  // bgColor?: string;
  variant?: keyof typeof variants;
  className?: string;
}

const fontSize = "font-medium";

// hover-hover:
// hover-none:

const variants = {
  custom: "",
  primary:
    "bg-[#FC3F1D] text-white gap-x-2 p-3 hover-hover:hover:bg-[#FC3F1D]/80 hover-hover:active:bg-[#FC3F1D] hover-none:active:bg-[#FC3F1D]/70",

  secondary:
    "bg-gray-900 hover:bg-gray-900/80 text-white active:bg-gray-900 gap-x-2 p-3",
  simple:
    "bg-gray-100 hover:bg-gray-100/80 text-gray-800 active:bg-gray-100 gap-x-2 p-3",
  link: "text-black hover:text-gray-700/90 hover:underline active:text-black underline-offset-2",
};

// bg-gray-900 text-white hover:bg-gray-900/80 hover:shadow-md active:bg-gray-700 active:scale-95 touch:active:bg-gray-700 focus:outline-none transition-all duration-200

export function Button({
  type,
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "flex justify-center items-center min-w-fit rounded-xl",
        variant === "link" ||
          "hover-hover:hover:shadow-md hover-hover:active:shadow-none",
        variants[variant],
        fontSize,
        className
      )}
      {...props}
    >
      {children}
      {/* <span className="hidden hover-none:bg-gray-900">kjhkj</span> */}
    </button>
  );
}
