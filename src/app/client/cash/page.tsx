import * as bankAccService from "@/services/BankAccService";
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

import * as depositService from "@/services/DepositService";
import * as cashFreeService from "@/services/CashFreeService";
import * as loanService from "@/services/LoanService";
type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

const currencyColumns = [
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
export default async function App() {
  const user = await getCurrentUser();
  const accounts = (await bankAccService.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading className="text-center">Add bank asset</Heading>
        <FormAssets
          userId={user?.id}
          accounts={accounts}
          getCurrencyServerBody={getCurrencyServerBody}
        />
      </MainContainer>

      {accounts.map(async (account) => {

        const accSum = await bankAccService.getTotal(account._id);

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
                columns={currencyColumns}
                service={depositService}
              >
                Deposits
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={currencyColumns}
                service={cashFreeService}
              >
                Cash
              </TableAssets>
            </SuspenseLoading>

            <SuspenseLoading>
              <TableAssets
                userId={user?.id}
                accountId={account._id}
                columns={currencyColumns}
                service={loanService}
              >
                Loan
              </TableAssets>
            </SuspenseLoading>
          </AccountLayout>
        );
      })}
    </div>
  );
}
