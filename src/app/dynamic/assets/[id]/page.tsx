import { TableAssets } from "@/components/TableAssets";
import { AssetTableLoading } from "@/components/AssetTableLoading";
import { Suspense } from "react";
import { Heading } from "@/components/Heading";
import { FormAssets } from "@/app/dynamic/assets/FormAssets";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";

import { CURRENCY } from "@/utils/constants";

import * as fundSService from "@/services/FundSService";
import * as stockService from "@/services/StockService";
import * as fundBService from "@/services/FundBService";
import * as bondService from "@/services/BondService";
import * as currencyService from "@/services/CurrencyService";

import * as brokerAccSevice from "@/services/BrokerAccService";

import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { type MoexJson } from "@/utils/moexInfo";
import { getDataByField } from "@/utils/moexInfo";

import { FaArrowLeft } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const account = await brokerAccSevice.getOneById(id);

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

      fullname: await getDataByField(moexJson, "fullname"),
      nominal: await getDataByField(moexJson, "nominal"),
      coupon: await getDataByField(moexJson, "coupon"),
      nextCoupon: await getDataByField(moexJson, "nextCoupon"),
      couponPerion: await getDataByField(moexJson, "couponPerion"),

      couponValue: await getDataByField(moexJson, "couponValue"),
      
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
    <Suspense
      fallback={
        <MainContainer>
          <AssetTableLoading />
        </MainContainer>
      }
    >
      {children}
    </Suspense>
  );
  return (
    <div className="flex flex-col">
      <div className="flex items-center p-4 justify-between sticky top-0 z-40 backdrop-blur-2xl">
        <Link href="/client/assets">
          <FaArrowLeft size={24} />
        </Link>

        <div className="flex flex-col items-center ">
          <span>{account.shortName}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{id}</span>
        </div>

        <FaClock size={24} />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <MainContainer>
          <Heading className="text-center">Add broker asset</Heading>
          <FormAssets
            userId={user?.id}
            brokerId={id}
            getFundEtfServerBody={getFundEtfServerBody}
            getBondServerBody={getBondServerBody}
            getCurrencyServerBody={getCurrencyServerBody}
          />
        </MainContainer>

        <SuspenseLoading>
          <TableAssets
            accountId={id}
            service={currencyService}
            typeOfAssets="currency"
          >
            Currency
          </TableAssets>
        </SuspenseLoading>

        <SuspenseLoading>
          <TableAssets
            accountId={id}
            service={fundSService}
            typeOfAssets="funds-s"
          >
            ETF stocks
          </TableAssets>
        </SuspenseLoading>

        <SuspenseLoading>
          <TableAssets
            accountId={id}
            service={stockService}
            typeOfAssets="stocks"
          >
            Stocks
          </TableAssets>
        </SuspenseLoading>

        <SuspenseLoading>
          <TableAssets
            accountId={id}
            service={fundBService}
            typeOfAssets="funds-b"
          >
            ETF bonds
          </TableAssets>
        </SuspenseLoading>

        <SuspenseLoading>
          <TableAssets
            accountId={id}
            service={bondService}
            typeOfAssets="bonds"
          >
            Bonds
          </TableAssets>
        </SuspenseLoading>
      </div>
    </div>
  );
}
