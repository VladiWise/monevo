"use client";

import React, { useState, useRef, useEffect } from "react";
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

  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");
  // Функция для переключения состояния
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Устанавливаем высоту равной полной высоте содержимого
        setHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        // Высота 0px, чтобы скрыть содержимое
        setHeight("0px");
      }
    }
  }, [isOpen]);

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

      <section
        className="overflow-hidden transition-[height] duration-700 ease-in-out"
        style={{ height }}
      >
        <div ref={contentRef}>{children}</div>
      </section>

      {/* <section ref={contentRef}>{children}</section> */}
    </MainContainer>
  );
}
