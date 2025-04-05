"use client";

import { MainBlockWrapper } from "../MainBlockWrapper";
import { SingleSection } from "../SingleSection";
import { type Data } from "@/app/client/home/page";


import { CURRENCY } from "@/utils/constants";

export type CurrenciesType = {
  currency: keyof typeof CURRENCY;
  name: (typeof CURRENCY)[keyof typeof CURRENCY];
  value: number;
};

export function TypeOfAssets({
  isLeftSection,
  assetData,
  IISTotal,
}: {
  isLeftSection?: boolean;
  assetData: Data;
  IISTotal: number;
}) {
  const totalAssets =
    assetData?.bonds +
    assetData?.stocks +
    assetData?.cashBroker +
    assetData?.deposit +
    assetData?.cashFree;

  return (
    <MainBlockWrapper title="Type of assets" isLeftSection={isLeftSection}>
      <div className="flex flex-col h-full w-full justify-center">
        <section className=" grid grid-cols-[3fr_3fr_1fr] w-full items-center gap-x-2 gap-1 ">
          <SingleSection
            title="Liquid assets"
            value={totalAssets - IISTotal}
            totalAssets={totalAssets}
          />

          <SingleSection
            title="IIS"
            value={IISTotal ?? 0}
            totalAssets={totalAssets}
          />
        </section>
      </div>
    </MainBlockWrapper>
  );
}
