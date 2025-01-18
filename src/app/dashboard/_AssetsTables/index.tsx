import * as accountService from "@/services/AccountService";
import { StockEtfTable } from "./StockEtfTable";
import { BondTable } from "./BondTable";
import { getDataByField } from "@/utils/moexInfo";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { MainContainer } from "@/components/MainContainer";

export default async function AssetsTables() {
  const accounts = await accountService.getList();

  return (
    <>
      <Suspense
        fallback={
          <MainContainer >
            <Loader size="8" />
          </MainContainer>
        }
      >
        <StockEtfTable
          accounts={accounts}
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
          accounts={accounts}
          findAmountById={findAmountById}
          getDataByField={getDataByField}
        />
      </Suspense>
    </>
  );

  function findAmountById(item: any, accountId: string) {
    let amount = 0;

    item.accounts.forEach((account: any) => {
      if (account.id === accountId) {
        amount = account.amount;
        return account.amount;
      }
    });

    return amount;
  }
}
