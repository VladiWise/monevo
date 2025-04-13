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
import { AssetTableLoading } from "@/components/AssetTableLoading";
import { AccountLayout } from "@/components/AccountLayout";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { type MoexJson } from "@/utils/moexInfo";
import { getDataByField } from "@/utils/moexInfo";
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

export default async function App() {
  const getFundEtfServerBody = async (data: any, moexJson: MoexJson) => {
    "use server";
    return {
      accountId: data.accountId,
      ticker: data.ticker,
      amount: data.amount,
      name: await getDataByField(moexJson, "shortName"),
      currency: await getDataByField(moexJson, "currency"),
      price: await getDataByField(moexJson, "price"),
    };
  };

  const getBondServerBody = async (data: any, moexJson: MoexJson) => {
    "use server";
    return {
      accountId: data.accountId,
      ticker: data.ticker,
      amount: data.amount,
      name: await getDataByField(moexJson, "shortName"),
      currency: await getDataByField(moexJson, "currency"),
      price:
        ((await getDataByField(moexJson, "price")) *
          (await getDataByField(moexJson, "nominal")) *
          (await fetchCurrencyValue(
            await getDataByField(moexJson, "currency")
          ))) /
          100 +
        (await getDataByField(moexJson, "coupon")),
      bondYield: await getDataByField(moexJson, "bondYield"),
      matDate: await getDataByField(moexJson, "matDate"),
    };
  };

  const getCurrencyServerBody = async (data: any) => {
    "use server";
    return {
      ticker: data.currency,
      amount: +data.amount,
      name: CURRENCY[data.currency as keyof typeof CURRENCY],
      price: await fetchCurrencyValue(data.currency),
    };
  };

  const SuspenseLoading = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<AssetTableLoading />}>{children}</Suspense>
  );

  const user = await getCurrentUser();
  const accounts = (await brokerAccSevice.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading className="text-center">Add broker asset</Heading>
        <FormAssets
          userId={user?.id}
          accounts={accounts}
          getFundEtfServerBody={getFundEtfServerBody}
          getBondServerBody={getBondServerBody}
          getCurrencyServerBody={getCurrencyServerBody}
        />
      </MainContainer>

      {accounts.map(async (account) => {
        const accSum = await brokerAccSevice.getTotal(account._id);

        return (
          <AccountLayout
            key={account._id}
            header={account.shortName}
            sum={accSum}
          >
          

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                service={currencyService}
                typeOfAssets="currency"
              >
                Currency
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                service={fundSService}
                typeOfAssets="etfStocks"
              >
                ETF stocks
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                service={stockService}
                typeOfAssets="stocks"
              >
                Stocks
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                service={fundBService}
                typeOfAssets="etfBonds"
              >
                ETF bonds
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                service={bondService}
                typeOfAssets="bonds"
              >
                Bonds
              </TableAssets>
            </SuspenseLoading>
          </AccountLayout>
        );
      })}
    </div>
  );
}
