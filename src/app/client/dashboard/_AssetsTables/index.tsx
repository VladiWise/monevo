import * as accountService from "@/services/AccountService";
import { StockEtfTable } from "./StockEtfTable";
import { BondEtfTable } from "./BondEtfTable";
import { BondTable } from "./BondTable";
import { StockTable } from "./StockTable";
import { getDataByField } from "@/utils/moexInfo";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { MainContainer } from "@/components/MainContainer";

export default async function AssetsTables() {
  // const bankAccounts = await accountService.getList();

  return (








      {/* <Suspense
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
        <BondEtfTable
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
        <StockTable
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
      </Suspense> */}

  );

}
