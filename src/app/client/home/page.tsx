import { Currencies } from "./sections/Currencies";
import { TypeOfAssets } from "./sections/TypeOfAssets";
import { Categories } from "./sections/Categories";

import { Suspense } from "react";
import { SuspenseMainBlockWrapper } from "./SuspenseMainBlockWrapper";

import { getCurrentUser } from "@/auth-actions/getCurrentUser";


import { NetCapital } from "./sections/NetCapital";

import { CURRENCY } from "@/utils/constants";

export type Data = {
  bonds: number;
  stocks: number;
  cashBroker: number;
  cashFree: number;
  deposit: number;
  loan: number;
};

export type CurrenciesType = {
  currency: keyof typeof CURRENCY;
  name: (typeof CURRENCY)[keyof typeof CURRENCY];
  value: number;
};

export default async function App() {
  const user = await getCurrentUser();
  if (!user) return null;

  return (
    <div className="flex flex-col items-center w-full gap-10 md:grid md:grid-cols-2  ">
      <Suspense
        fallback={
          <SuspenseMainBlockWrapper title="Net capital" isLeftSection />
        }
      >
        <NetCapital userId={user?.id} isLeftSection />
      </Suspense>
      <Suspense fallback={<SuspenseMainBlockWrapper title="Categories" />}>
        <Categories />
      </Suspense>

      <Suspense
        fallback={
          <SuspenseMainBlockWrapper title="Type of assets" isLeftSection />
        }
      >
        <TypeOfAssets isLeftSection />
      </Suspense>

      <Suspense fallback={<SuspenseMainBlockWrapper title="Currencies" />}>
        <Currencies />
      </Suspense>
    </div>
  );
}
