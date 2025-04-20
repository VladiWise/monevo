import { TableAssets } from "@/components/TableAssets";
import { AssetTableLoading } from "@/components/AssetTableLoading";
import { Suspense } from "react";
import * as fundSService from "@/services/FundSService";
import * as stockService from "@/services/StockService";
import * as fundBService from "@/services/FundBService";
import * as bondService from "@/services/BondService";
import * as currencyService from "@/services/CurrencyService";

import * as brokerAccSevice from "@/services/BrokerAccService";

import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";

import { FaArrowLeft } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const account = await brokerAccSevice.getOneById(id);

  const SuspenseLoading = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<MainContainer><AssetTableLoading /></MainContainer>}>{children}</Suspense>
  );
  return (
    <div className="flex flex-col gap-4 ">
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
            typeOfAssets="etfStocks"
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
            typeOfAssets="etfBonds"
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
