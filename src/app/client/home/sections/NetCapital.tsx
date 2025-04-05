"use client";

import { UpdateMoexButton } from "../UpdateMoexButton";
import { Button } from "@/components/Button";
import { CgArrowsExchangeV } from "react-icons/cg";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { MainBlockWrapper } from "../MainBlockWrapper";
import * as totalService from "@/services/TotalService";
import toast from "react-hot-toast";
import { type Data } from "@/app/client/home/page";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";

import { useEffect, useState, useRef } from "react";

export function NetCapital({
  assetData,
  totalAssets,
  userId,
  isLeftSection,
  loadPageData,
}: {
  userId: string;
  totalAssets: number;
  assetData: Data;
  loadPageData: () => Promise<void>;
  isLeftSection?: boolean;
}) {
  const [currency, setCurrency] = useState<string>("RUB");

  const [prevSum, setPrevSum] = useState<number>(0);

  const [USD, setUSD] = useState<number>(0);

  useEffect(() => {
    fetchNetCapitalPageData();
  }, [assetData]);

  async function fetchNetCapitalPageData() {
    setPrevSum(0);

    try {
      const totalPrev = await totalService.getByUserId(userId);

      setPrevSum(
        totalPrev?.total?.assets?.bonds +
          totalPrev?.total?.assets?.stocks +
          totalPrev?.total?.assets?.cashBroker +
          totalPrev?.total?.assets?.deposit +
          totalPrev?.total?.assets?.cashFree -
          totalPrev?.total?.assets?.loan
      );

      const USD = await fetchCurrencyValue("USD");
      setUSD(USD);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <MainBlockWrapper title="Net capital" isLeftSection={isLeftSection}>
      {/* {!!prevSum ? ( */}
      <section className="h-32 flex flex-col items-center justify-center">
        <span className="text-2xl dark:text-white font-bold">
          {currency === "RUB" &&
            `${formatNumberWithSpaces(totalAssets - assetData.loan)} ₽`}

          {currency === "USD" &&
            `${formatNumberWithSpaces((totalAssets - assetData.loan) / USD)} $`}
        </span>

        {!!prevSum ? (
          sumAssets(currency).isProfit ? (
            <span className="text-green-500 dark:text-white font-medium">
              {sumAssets(currency).string}
            </span>
          ) : (
            <span className="text-red-500 dark:text-white font-medium">
              {sumAssets(currency).string}
            </span>
          )
        ) : (
          <div className="h-6 rounded-lg bg-darkGray w-24 animate-pulse"></div>
        )}
      </section>
      {/* ) : (
        <section className="h-32 flex flex-col items-center justify-center animate-pulse w-full gap-2">
          <div className="h-6 rounded-lg bg-darkGray w-40"></div>

          <div className="h-6 rounded-lg bg-darkGray w-36"></div>
        </section>
      )} */}

      <section className="flex gap-2">
        <UpdateMoexButton userId={userId} loadPageData={loadPageData} />
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
              totalService.create(assetData, userId).then(() => loadPageData()),
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

  function sumAssets(currency: string) {
    const diff = totalAssets - assetData.loan - prevSum;
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
}
