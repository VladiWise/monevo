"use client";

import { useEffect, useState } from "react";

import { SingleSection } from "../SingleSection";
import { MainBlockWrapper } from "../MainBlockWrapper";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { type Data } from "@/app/client/home/page";

import { formatNumberWithSpaces } from "@/utils/mathUtils";

import { getAssetsInfoByUserId } from "@/services/HomeService";

import { CURRENCY } from "@/utils/constants";
import { error } from "console";

export type CurrenciesType = {
  currency: keyof typeof CURRENCY;
  name: (typeof CURRENCY)[keyof typeof CURRENCY];
  value: number;
};

export function Categories({
  assetData,
  totalAssets,
  isLeftSection,
}: {
  assetData: Data;
  totalAssets: number;
  isLeftSection?: boolean;
}) {
  return (
    <MainBlockWrapper title="Categories" isLeftSection={isLeftSection}>
      <section className=" grid grid-cols-[3fr_3fr_1fr] w-full items-center gap-x-2 gap-1 ">
        <SingleSection
          title="Deposits"
          value={assetData.deposit}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Bonds"
          value={assetData.bonds}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Stocks"
          value={assetData.stocks}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Cash broker"
          value={assetData.cashBroker}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Cash free"
          value={assetData.cashFree}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Loans"
          value={assetData.loan}
          totalAssets={totalAssets}
        />
      </section>

      <div className={"flex items-center justify-between w-full"}>
        <span className="text-lg dark:text-white font-medium">
          Total capital
        </span>
        <span className="text-lg dark:text-white font-bold">
          {`${formatNumberWithSpaces(totalAssets)} ₽`}
        </span>
      </div>
    </MainBlockWrapper>
  );
}
