"use client";

import { useEffect, useState } from "react";
import * as brokerAccSevice from "@/services/BrokerAccService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssets } from "./FormAssets";
import { MainContainer } from "@/components/MainContainer";
import { getLocalDateByISO } from "@/utils/dataFormat";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { CURRENCY } from "@/utils/constants";
import React, { Suspense } from "react";
import { TableAssets } from "./TableAssets";
import { Heading } from "@/components/Heading";
import toast from "react-hot-toast";

import {
  getFundEtfServerBody,
  getBondServerBody,
  getCurrencyServerBody,
} from "./server-action";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { type MoexJson } from "@/utils/moexInfo";
import { getDataByField } from "@/utils/getDataByField";
import * as fundSService from "@/services/FundSService";
import * as stockService from "@/services/StockService";
import * as fundBService from "@/services/FundBService";
import * as bondService from "@/services/BondService";
import * as currencyService from "@/services/CurrencyService";
type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchTableAssetsPageData();
  }, []);

  async function fetchTableAssetsPageData() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const user = await getCurrentUser();
      const accounts = (await brokerAccSevice.getList(user?.id)) as Account[];

      if (!user) throw new Error("User not found");

      setAccounts(accounts);
      setUserId(user.id);
      setIsLoading(false);

      setTrigger((prev) => !prev);
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading className="text-center mb-5">Add broker asset</Heading>
        <FormAssets
          userId={userId}
          accounts={accounts}
          getFundEtfServerBody={getFundEtfServerBody}
          getBondServerBody={getBondServerBody}
          getCurrencyServerBody={getCurrencyServerBody}
          updatePageContent={fetchTableAssetsPageData}
        />
      </MainContainer>

      {accounts.map((account) => (
        <MainContainer key={account._id}>
          <Heading className="text-center mb-5">{account.shortName}</Heading>

          {/* <Loading /> */}

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={currencyService}
            typeOfAssets="currency"
          >
            Currency
          </TableAssets>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={fundSService}
            typeOfAssets="etfStocks"
          >
            ETF stocks
          </TableAssets>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={stockService}
            typeOfAssets="stocks"
          >
            Stocks
          </TableAssets>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={fundBService}
            typeOfAssets="etfBonds"
          >
            ETF bonds
          </TableAssets>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={bondService}
            typeOfAssets="bonds"
          >
            Bonds
          </TableAssets>
        </MainContainer>
      ))}
    </div>
  );
}
