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

const variants = {
  custom: "bg-[#007BFF] hover:bg-[#007BFF]/80 active:bg-[#007BFF] text-white",
  primary: "bg-[#FC3F1D] hover:bg-[#FC3F1D]/80 text-white active:bg-[#FC3F1D]",
  secondary: "bg-gray-800 hover:bg-gray-900/80 text-white active:bg-gray-900",
  simple: "bg-gray-100 hover:bg-gray-100/80 text-gray-800 active:bg-gray-100",
  link: "text-black hover:text-gray-700/90 hover:underline underline-offset-2",
};

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
        "flex justify-center items-center gap-x-2 p-3 min-w-fit rounded-xl",
        variant === "link" || "hover:shadow-md active:shadow-none",
        variants[variant],
        fontSize,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
