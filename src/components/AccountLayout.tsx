"use client";

import React, { useState } from "react";
import { MainContainer } from "@/components/MainContainer";
import { formatNumberWithSpaces } from "@/utils/mathUtils";

export function AccountLayout({
  children,
  header,
  sum,
}: {
  children: React.ReactNode;
  header: string;
  sum: number;
}) {
  // Состояние для отслеживания, открыт ли список
  const [isOpen, setIsOpen] = useState(false);

  // Функция для переключения состояния
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <MainContainer className="gap-10">
      <section
        className="flex items-center justify-between text-xl font-bold text-darkMain dark:text-white w-full cursor-pointer"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex flex-col items-center justify-center w-full gap-2">
          {header}

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatNumberWithSpaces(sum)} ₽
          </span>
        </div>
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          style={isOpen ? { transform: "scaleY(-1)" } : {}}
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </section>

      {isOpen && <section>{children}</section>}
    </MainContainer>
  );
}
