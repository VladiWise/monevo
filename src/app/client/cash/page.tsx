"use client";

import { useEffect, useState } from "react";
import Loading from "../loading";
import * as bankAccService from "@/services/BankAccService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssets } from "./FormAssets";
import { MainContainer } from "@/components/MainContainer";
import toast from "react-hot-toast";
import { CURRENCY } from "@/utils/constants";

import { TableAssets } from "./TableAssets";
import { Heading } from "@/components/Heading";

import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";

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

const getCurrencyServerBody = async (data: any) => {
  return {
    ticker: data.currency,
    amount: +data.amount,
    name: CURRENCY[data.currency as keyof typeof CURRENCY],
    price: await fetchCurrencyValue(data.currency),
  };
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
    try {
      const user = await getCurrentUser();
      const accounts = (await bankAccService.getList(user?.id)) as Account[];

      if (!user) throw new Error("User not found");

      setAccounts(accounts);
      setUserId(user.id);
      setIsLoading(false);

      setTrigger((prev) => !prev);
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading className="text-center">Add bank asset</Heading>
        <FormAssets
          userId={userId}
          accounts={accounts}
          getCurrencyServerBody={getCurrencyServerBody}
          updatePageContent={fetchTableAssetsPageData}
        />
      </MainContainer>

      {accounts?.map((account) => (
        <MainContainer key={account._id}>
          <Heading className="text-center">{account.shortName}</Heading>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={depositService}
          >
            Deposits
          </TableAssets>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={cashFreeService}
          >
            Cash
          </TableAssets>

          <TableAssets
            trigger={trigger}
            updatePageContent={fetchTableAssetsPageData}
            userId={userId}
            accountId={account._id}
            service={loanService}
          >
            Loan
          </TableAssets>
        </MainContainer>
      ))}
    </div>
  );
}
