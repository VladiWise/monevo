import { Currencies } from "./sections/Currencies";
import { TypeOfAssets } from "./sections/TypeOfAssets";
import { Categories } from "./sections/Categories";
import { MainBlockWrapper } from "./MainBlockWrapper";
import { Suspense } from "react";
import { SuspenseMainBlockWrapper } from "./SuspenseMainBlockWrapper";

import { getCurrentUser } from "@/auth-actions/getCurrentUser";

import {
  getAssetsInfoByUserId,
  getAssetTypesByUserId,
} from "@/services/HomeService";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { NetCapital } from "./sections/NetCapital";
import * as totalService from "@/services/TotalService";
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
  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  return (
    <div className="flex flex-col items-center w-full gap-10 md:grid md:grid-cols-2  ">
      <NetCapital userId={user?.id} isLeftSection />

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
