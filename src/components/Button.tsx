"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  isPending?: boolean;
}

const fontSize = "font-medium";

// hover-hover:
// hover-none:

const variants = {
  custom: "",
  prim: "text-white shadow-md shadow-red-900",
  primary:
    "bg-primary hover:bg-primary/80 active:bg-primary hover-none:active:bg-primary/70 text-white",
  darkMain:
    "bg-darkMain hover:bg-darkMain/80 active:bg-darkMain hover-none:active:bg-darkMain/70 text-white",
  simple:
    "bg-gray-100 hover:bg-gray-100/80 active:bg-gray-100 hover-none:active:bg-gray-100/70 text-gray-800",
  link: "hover:underline underline-offset-2 text-darkMain dark:text-white hover:text-darkMain/80 dark:hover:text-white/80 active:text-black",
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
      disabled={isPending}
      type={type}
      className={clsx(
        "flex justify-center items-center min-w-fit rounded-xl",
        variant === "link" || variant === "whiteLink"
          ? ""
          : "gap-x-2 p-3 hover:shadow-md active:shadow-none hover-none:active:scale-95 transition-all duration-500",

        variants[variant],
        fontSize,
        className
      )}
      {...props}
    >
      {isPending && (
        <span
          className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"
          role="status"
          aria-label="Loading"
        ></span>
      )}
      {children}
    </button>
  );
}
