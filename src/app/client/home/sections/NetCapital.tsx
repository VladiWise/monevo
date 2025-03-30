"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SuspenseMainBlockWrapper } from "../SuspenseMainBlockWrapper";

import { MainContainer } from "@/components/MainContainer";
import { UpdateMoexButton } from "../UpdateMoexButton";
import { Button } from "@/components/Button";
import { CgArrowsExchangeV } from "react-icons/cg";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { useNotification } from "@/store/useNotification";
import { MainBlockWrapper } from "../MainBlockWrapper";
import * as totalService from "@/services/TotalService";

import { Data } from "@/app/client/home/page";

import { getAssetsInfoByUserId } from "@/services/HomeService";
import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";

export function NetCapital({
  userId,
  isLeftSection,
}: {
  userId: string | undefined;
  isLeftSection?: boolean;
}) {
  const [currency, setCurrency] = useState<string>("RUB");
  const [data, setData] = useState<Data>({} as Data);
  const [totalPrev, setTotalPrev] = useState<any>();
  const [USD, setUSD] = useState<number>(1);

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchPageData();
  }, []);

  async function fetchPageData() {
    const assetsInfo = await getAssetsInfoByUserId(userId!);
    if (assetsInfo) {
      setData(assetsInfo);
    } else {
      // Handle the case where assetsInfo is undefined
      console.error("Failed to fetch assets info");
    }

    setTotalPrev(await totalService.getByUserId(userId));

    setUSD(await fetchCurrencyValue("USD"));

    setIsLoading(false);
  }

  const notification = useNotification();

  const currentSum =
    +data?.bonds +
    +data?.stocks +
    +data?.cashBroker +
    +data?.deposit +
    +data?.cashFree -
    +data?.loan;
  const prevSum =
    +totalPrev?.total?.assets?.bonds +
    +totalPrev?.total?.assets?.stocks +
    +totalPrev?.total?.assets?.cashBroker +
    +totalPrev?.total?.assets?.deposit +
    +totalPrev?.total?.assets?.cashFree -
    +totalPrev?.total?.assets?.loan;

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

  if (isLoading)
    return <SuspenseMainBlockWrapper title="Net capital" isLeftSection />;

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
        <UpdateMoexButton userId={userId} updateContent={fetchPageData} />
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
              totalService
                .create(data, userId)
                .then(() => {
                  fetchPageData();
                })
                .then(() => router.refresh()),
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
