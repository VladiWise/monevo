import * as accountService from "@/services/AccountService";
import { StockEtfTable } from "./StockEtfTable";
import { BondTable } from "./BondTable";
import { getDataByField } from "@/utils/moexInfo";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { MainContainer } from "@/components/MainContainer";

export default async function AssetsTables() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const bankAccounts = await accountService.getList();

  return (
    <>
      <Suspense
        fallback={
          <MainContainer>
            <Loader size="8" />
          </MainContainer>
        }
      >
        <StockEtfTable
          bankAccounts={bankAccounts}
          findAmountById={findAmountById}
          getDataByField={getDataByField}
        />
      </Suspense>
      <Suspense
        fallback={
          <MainContainer>
            <Loader size="8" />
          </MainContainer>
        }
      >
        <BondTable
          bankAccounts={bankAccounts}
          findAmountById={findAmountById}
          getDataByField={getDataByField}
        />
      </Suspense>
    </>
  );

  function findAmountById(item: any, accountId: string) {
    let amount = 0;

    item.bankAccounts.forEach((bankAccount: any) => {
      if (bankAccount.id === accountId) {
        amount = bankAccount.amount;
        return bankAccount.amount;
      }
    });

    return amount;
  }
}
