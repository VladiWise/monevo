"use client";

import { MainBlockWrapper } from "../MainBlockWrapper";
import { SingleSection } from "../SingleSection";

import { CURRENCY } from "@/utils/constants";

export type CurrenciesType = {
  currency: keyof typeof CURRENCY;
  name: (typeof CURRENCY)[keyof typeof CURRENCY];
  value: number;
};

export function Currencies({
  isLeftSection,
  totalAssets,
  currencyCategories,
}: {
  isLeftSection?: boolean;
  totalAssets: number;
  currencyCategories: CurrenciesType[];
}) {


  return (
    <MainBlockWrapper title="Currencies" isLeftSection={isLeftSection}>
      <div className="flex flex-col h-full w-full justify-center">
        <section className=" grid grid-cols-[3fr_3fr_1fr] w-full items-center gap-x-2 gap-1 ">
          {currencyCategories.map((categ) => (
            <SingleSection
              totalAssets={totalAssets}
              title={categ.currency}
              value={categ.value}
              key={categ.name}
            />
          ))}
        </section>
      </div>
    </MainBlockWrapper>
  );
}
