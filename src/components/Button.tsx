"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

const fontSize = "font-medium"

const variants = {
  primary:
    "bg-red-100 hover:bg-red-100/80 hover:shadow-md text-red-600 active:bg-red-100 active:shadow-none",
  secondary:
    "bg-gray-800 hover:bg-gray-900/80 hover:shadow-md text-white active:bg-gray-900 active:shadow-none",
  simple:
    "bg-gray-100 hover:bg-gray-100/80 hover:shadow-md text-gray-800 active:bg-gray-100 active:shadow-none",
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
        "flex justify-center p-3 min-w-fit font-bold rounded-xl",
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
