"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { UpdateMoexButton } from "../UpdateMoexButton";
import { Button } from "@/components/Button";
import { CgArrowsExchangeV } from "react-icons/cg";
import { roundToTwoDecimals } from "@/utils/mathUtils";

import { MainBlockWrapper } from "../MainBlockWrapper";
import * as totalService from "@/services/TotalService";

import { Data } from "@/app/client/home/page";

export function NetCapitalClient({
  userId,
  isLeftSection,
  data,
  totalPrev,
  USD,
  currentSum,
  prevSum,
}: {
  userId: string | undefined;
  isLeftSection?: boolean;
  data: Data;
  totalPrev: any;
  USD: number;
  currentSum: number;
  prevSum: number;
}) {
  const [currency, setCurrency] = useState<string>("RUB");

  const router = useRouter();

  function sumAssets(currency: string) {
    const diff = currentSum - prevSum;
    const times =
      prevSum === 0 || !prevSum
        ? 0
        : roundToTwoDecimals((diff / prevSum) * 100);

    const formattedStringRub = `${formatNumberWithSpaces(diff)}  ₽ | ${times}%`;
    const formattedStringUsd = `${formatNumberWithSpaces(
      diff / USD
    )}  $ | ${times}%`;

    return {
      string: currency === "RUB" ? formattedStringRub : formattedStringUsd,
      isProfit: diff >= 0,
    };
  }

  return (
    <MainBlockWrapper title="Net capital" isLeftSection={isLeftSection}>
      <section className="h-32 flex flex-col items-center justify-center">
        <span className="text-2xl dark:text-white font-bold">
          {currency === "RUB" && `${formatNumberWithSpaces(currentSum)} ₽`}

          {currency === "USD" &&
            `${formatNumberWithSpaces(currentSum / USD)} $`}
        </span>

        {sumAssets(currency).isProfit ? (
          <span className="text-green-500 dark:text-white font-medium">
            {sumAssets(currency).string}
          </span>
        ) : (
          <span className="text-red-500 dark:text-white font-medium">
            {sumAssets(currency).string}
          </span>
        )}
      </section>
      <section className="flex gap-2">
        <UpdateMoexButton userId={userId} />
        <Button
          className="flex gap-x-0"
          variant="link"
          onClick={() => setCurrency(currency === "RUB" ? "USD" : "RUB")}
        >
          <CgArrowsExchangeV size={24} />
          {currency === "RUB" ? "in USD" : "in RUB"}
        </Button>
      </section>
      <Button
        variant="link"
        onClick={() => {
          if (!confirm("You really want to record data?")) return;
          toast
            .promise(
              totalService.create(data, userId).then(() => router.refresh()),
              {
                loading: "Updating data...",
                success: "Data successfully updated",
                error: "Failed to update data.",
              }
            )

            .catch((error) => {
              toast.error(error?.message || "Failed to update data.");
            });
        }}
      >
        Record data
      </Button>
    </MainBlockWrapper>
  );

  function formatNumberWithSpaces(number: number) {
    const roundedNumber = Math.round(number);
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
