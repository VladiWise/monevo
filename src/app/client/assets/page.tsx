import * as brokerAccSevice from "@/services/BrokerAccService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssets } from "./FormAssets";
import { MainContainer } from "@/components/MainContainer";
import { getLocalDateByISO } from "@/utils/dataFormat";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { CURRENCY } from "@/utils/moexInfo";
import React, { Suspense } from "react";
import { TableAssets } from "./TableAssets";
import { Heading } from "@/components/Heading";

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

  const fundStockColumns = [
    // {
    //   title: "Created",
    //   name: "createdAt",
    //   getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
    // },
    {
      title: "Updated",
      name: "updatedAt",
      getCellContent: (item: any) => getLocalDateByISO(item.updatedAt),
    },
    {
      title: "name",
      name: "name",
    },
    {
      title: "ticker",
      name: "ticker",
    },
    {
      title: "currency",
      name: "currency",
    },
    {
      title: "price",
      name: "price",
      getCellContent: (item: any) => roundToTwoDecimals(item.price),
    },
    {
      title: "amount",
      name: "amount",
    },
    {
      title: "total",
      name: "total",
      getCellContent: (item: any) => roundToTwoDecimals(item.total),
    },
  ];

  const bondColumns = [
    // {
    //   title: "Created",
    //   name: "createdAt",
    //   getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
    // },
    {
      title: "Updated",
      name: "updatedAt",
      getCellContent: (item: any) => getLocalDateByISO(item.updatedAt),
    },
    {
      title: "Name",
      name: "name",
    },
    {
      title: "Ticker",
      name: "ticker",
    },
    {
      title: "Currency",
      name: "currency",
    },

    {
      title: "Price",
      name: "price",
      getCellContent: (item: any) => roundToTwoDecimals(item.price),
    },

    {
      title: "Yield",
      name: "bondYield",
    },

    {
      title: "Mat date",
      name: "matDate",
    },
    {
      title: "amount",
      name: "amount",
    },
    {
      title: "Total",
      name: "total",
      getCellContent: (item: any) => roundToTwoDecimals(item.total),
    },
  ];

  const currencyColumns = [
    // {
    //   title: "Created",
    //   name: "createdAt",
    //   getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
    // },
    {
      title: "Updated",
      name: "updatedAt",
      getCellContent: (item: any) => getLocalDateByISO(item.updatedAt),
    },
    {
      title: "Name",
      name: "name",
    },
    {
      title: "Ticker",
      name: "ticker",
    },

    {
      title: "Price",
      name: "price",
      getCellContent: (item: any) => roundToTwoDecimals(item.price),
    },
    {
      title: "amount",
      name: "amount",
    },
    {
      title: "Total",
      name: "total",
      getCellContent: (item: any) => roundToTwoDecimals(item.total),
    },
  ];

  const getFundEtfServerBody = async (data: any, moexJson: MoexJson) => {
    "use server";
    return {
      accountId: data.accountId,
      ticker: data.ticker,
      amount: data.amount,
      name: await getDataByField(moexJson, "name"),
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
      name: await getDataByField(moexJson, "name"),
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

  const Loading = () => (
    <div className=" w-full">
      <div className="flex animate-pulse space-x-4">
        <div className="flex flex-col gap-4 py-1 w-full">
          <div className="h-7 rounded bg-darkGray w-28"></div>

          <div className="h-7 rounded bg-darkGray"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-7 rounded bg-darkGray"></div>
              <div className="col-span-2 h-7 rounded bg-darkGray"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-7 rounded bg-darkGray"></div>
              <div className="col-span-1 h-7 rounded bg-darkGray"></div>
            </div>
            <div className="h-7 rounded bg-darkGray"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SuspenseLoading = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<Loading />}>{children}</Suspense>
  );

  const user = await getCurrentUser();
  const accounts = (await brokerAccSevice.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading>Add broker asset</Heading>
        <FormAssets
          userId={user?.id}
          accounts={accounts}
          getFundEtfServerBody={getFundEtfServerBody}
          getBondServerBody={getBondServerBody}
          getCurrencyServerBody={getCurrencyServerBody}
        />
      </MainContainer>

      {accounts.map(async (account) => {
        return (
          <MainContainer key={account._id}>
            <Heading>{account.shortName}</Heading>

            {/* <Loading /> */}

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={currencyColumns}
                service={currencyService}
              >
                Currency
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={fundStockColumns}
                service={fundSService}
              >
                ETF stocks
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={fundStockColumns}
                service={stockService}
              >
                Stocks
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={fundStockColumns}
                service={fundBService}
              >
                ETF bonds
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={bondColumns}
                service={bondService}
              >
                Bonds
              </TableAssets>
            </SuspenseLoading>
          </MainContainer>
        );
      })}
    </div>
  );
}
