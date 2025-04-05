"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Currencies } from "./sections/Currencies";
import { TypeOfAssets } from "./sections/TypeOfAssets";
import { Categories } from "./sections/Categories";
import { NetCapital } from "./sections/NetCapital";
import { Suspense } from "react";
import { SuspenseMainBlockWrapper } from "./SuspenseMainBlockWrapper";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { type User } from "@/auth-actions/getCurrentUser";
import { CURRENCY } from "@/utils/constants";
import {
  getAssetsInfoByUserId,
  getAssetTypesByUserId,
  getCurrenciesInfoByUserId,
} from "@/services/HomeService";
import { getErrorMessage } from "@/utils/getErrorMessage";
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [assetData, setAssetData] = useState<Data>({} as Data);
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [IISTotal, setIISTotal] = useState<number>(0);
  const [currencyCategories, setCurrencyCategories] = useState<
    CurrenciesType[]
  >([]);
  useEffect(() => {
    loadPageData();
  }, []);

  async function loadPageData() {
    try {
      const user = await getCurrentUser();

      if (!user) throw new Error("User not found");

      setUserId(user.id);

      const data = await getAssetsInfoByUserId(user.id);

      if ("error" in data) {
        throw new Error(data.error);
      }

      setTotalAssets(
        data.bonds +
          data.stocks +
          data.cashBroker +
          data.deposit +
          data.cashFree
      );

      const IISTotal = await getAssetTypesByUserId(user.id);

      if (typeof IISTotal === "object" && "error" in IISTotal) {
        throw new Error(IISTotal.error);
      }
      setIISTotal(IISTotal);

      const currencyCategories = (await getCurrenciesInfoByUserId(
        user.id
      )) as CurrenciesType[];

      setCurrencyCategories(currencyCategories);

      setAssetData(data);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);

      toast.error(getErrorMessage(error, "Failed to fetch data."));
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full gap-10 md:grid md:grid-cols-2  ">
        <SuspenseMainBlockWrapper title="Net capital" isLeftSection />
        <SuspenseMainBlockWrapper title="Categories" />
        <SuspenseMainBlockWrapper title="Type of assets" isLeftSection />
        <SuspenseMainBlockWrapper title="Currencies" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center w-full gap-10 md:grid md:grid-cols-2  ">
      <NetCapital
        assetData={assetData}
        totalAssets={totalAssets}
        userId={userId}
        loadPageData={loadPageData}
        isLeftSection
      />

      <Categories assetData={assetData} totalAssets={totalAssets} />

      <TypeOfAssets assetData={assetData} IISTotal={IISTotal} isLeftSection />

      <Currencies
        totalAssets={totalAssets}
        currencyCategories={currencyCategories}
      />
    </div>
  );
}
