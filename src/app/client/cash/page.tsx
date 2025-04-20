import * as bankAccService from "@/services/BankAccService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssets } from "./FormAssets";
import { MainContainer } from "@/components/MainContainer";

import { CURRENCY } from "@/utils/constants";
import React, { Suspense } from "react";

import { Heading } from "@/components/Heading";
import { AssetTableLoading } from "@/components/AssetTableLoading";
import { AccountLayout } from "@/components/AccountLayout";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";

type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
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
            type="cash"
            accountId={account._id}
            key={account._id}
            header={account.shortName}
            sum={accSum}
          />
        );
      })}
    </div>
  );
}
