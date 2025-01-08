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

const variants = {
  primary: "bg-red-600 hover:bg-red-600/80 hover:shadow-md text-white",
  simple: "bg-gray-100 hover:bg-gray-100/80 hover:shadow-md text-slate-700",
  link: "text-black hover:text-slate-700/90 hover:underline underline-offset-2",
};

export function Button({
  onClick,
  type,
  children,
  variant = "primary",
  className,
  ...props

} : ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "flex justify-center p-3 min-w-fit font-bold rounded-xl",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
