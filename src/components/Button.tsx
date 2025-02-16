"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  isPending?: boolean;
}

const fontSize = "font-medium";

// hover-hover:
// hover-none:

const variants = {
  custom: "",
  primary:
    "bg-primary hover:bg-primary/80 active:bg-primary hover-none:active:bg-primary/70 text-white",
  secondary:
    "bg-secondary hover:bg-secondary/80 active:bg-secondary hover-none:active:bg-secondary/70 text-white",
  simple:
    "bg-gray-100 hover:bg-gray-100/80 active:bg-gray-100 hover-none:active:bg-gray-100/70 text-gray-800",
  link: "hover:underline underline-offset-2 text-black hover:text-gray-700/90 active:text-black",
  whiteLink:
    "hover:underline underline-offset-2 text-white hover:text-gray-200 active:text-white",
};

export function Button({
  type,
  children,
  variant = "primary",
  className,
  isPending,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "flex justify-center items-center min-w-fit rounded-xl",
        variant === "link" || variant === "whiteLink"
          ? ""
          : "gap-x-2 p-3 hover:shadow-md active:shadow-none hover-none:active:scale-95 transition-all duration-200",

        variants[variant],
        fontSize,
        className
      )}
      {...props}
    >
      {isPending && (
        <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
      )}
      {children}
    </button>
  );
}
