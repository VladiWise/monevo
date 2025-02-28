"use client";

import { MainContainer } from "@/components/MainContainer";
import { UpdateMoexButton } from "./UpdateMoexButton";
import { Button } from "@/components/Button";
import { CgArrowsExchangeV } from "react-icons/cg";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { useNotification } from "@/store/useNotification";
import * as totalService from "@/services/TotalService";

import { useState } from "react";

export function MainAssetBoard({
  userId,
  data,
  totalPrev,
  usdValue,
}: {
  userId: string | undefined;
  data: any;
  totalPrev: any;
  usdValue: number;
}) {
  const [currency, setCurrency] = useState<string>("RUB");

  const notification = useNotification();

  function sumAssets(currency: string) {
    const prevSum =
      totalPrev?.total?.assets?.bonds + totalPrev?.total?.assets?.stocks;

    const diff = data?.bonds + data?.stocks - prevSum;
    const times =
      prevSum === 0 || !prevSum
        ? 0
        : roundToTwoDecimals((diff / prevSum) * 100);

    const formattedStringRub = `${formatNumberWithSpaces(diff)}  ₽ | ${times}%`;
    const formattedStringUsd = `${formatNumberWithSpaces(
      diff / usdValue
    )}  $ | ${times}%`;

    return {
      string: currency === "RUB" ? formattedStringRub : formattedStringUsd,
      isProfit: diff >= 0,
    };
  }

  return (
    <MainContainer className="max-w-96 items-center dark:text-white">
      Total assets
      <section className="h-32 flex flex-col items-center justify-center">
        <span className="text-2xl dark:text-white font-bold">
          {currency === "RUB" &&
            `${formatNumberWithSpaces(data.bonds + data.stocks)} ₽`}

          {currency === "USD" &&
            `${formatNumberWithSpaces(
              (data.bonds + data.stocks) / usdValue
            )} $`}
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
        onClick={() =>
          notification
            .promise(totalService.create(data, userId), {
              loading: "Updating data...",
              success: "Data successfully updated",
              error: "Failed to update data.",
            })

            .catch((error) => {
              notification.add(error.message, "error", 6000);
            })
        }
      >
        Record data
      </Button>
    </MainContainer>
  );

  function formatNumberWithSpaces(number: number) {
    const roundedNumber = Math.round(number);
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
