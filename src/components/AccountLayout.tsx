"use client";

import React, { useState, useRef, useEffect } from "react";
import { MainContainer } from "@/components/MainContainer";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { HiCreditCard } from "react-icons/hi2";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import Link from "next/link";

export function AccountLayout({
  type,
  accountId,
  header,
  sum,
}: {
  type: "assets" | "cash";
  accountId: string;
  header: string;
  sum: number;
}) {
  return (
    <MainContainer>
      <Link
        href={
          type === "assets"
            ? "/dynamic/assets/" + accountId
            : "/dynamic/cash/" + accountId
        }
        className="flex items-center justify-between text-xl font-bold text-darkMain dark:text-white w-full cursor-pointer"
      >
        <div className="flex flex-col justify-center w-full gap-1">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {header}
          </span>

          <span className="text-lg">{formatNumberWithSpaces(sum)} ₽</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Account id **{accountId.slice(-4)}
          </span>
        </div>

        <BsFillCreditCard2FrontFill size={28} color="#E49900" />
      </Link>
    </MainContainer>
  );
}
