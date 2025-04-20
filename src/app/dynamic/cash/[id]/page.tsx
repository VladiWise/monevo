import { TableAssets } from "@/components/TableAssets";
import { AssetTableLoading } from "@/components/AssetTableLoading";
import { Suspense } from "react";
import * as depositService from "@/services/DepositService";
import * as cashFreeService from "@/services/CashFreeService";
import * as loanService from "@/services/LoanService";

import * as bankAccService from "@/services/BankAccService";

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

  const account = await bankAccService.getOneById(id);

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
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center p-4 justify-between sticky top-0 z-40 backdrop-blur-2xl">
        <Link href="/client/cash">
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
            accountId={account._id}
            service={depositService}
            typeOfAssets="currency"
          >
            Deposits
          </TableAssets>
        </SuspenseLoading>

        <SuspenseLoading>
          <TableAssets
            accountId={account._id}
            service={cashFreeService}
            typeOfAssets="currency"
          >
            Cash
          </TableAssets>
        </SuspenseLoading>

        <SuspenseLoading>
          <TableAssets
            accountId={account._id}
            service={loanService}
            typeOfAssets="currency"
          >
            Loan
          </TableAssets>
        </SuspenseLoading>
      </div>
    </div>
  );
}
