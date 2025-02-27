import * as accountSevice from "@/services/AccountService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssets } from "./FormAssets";
import { MainContainer } from "@/components/MainContainer";
import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import { getLocalDateByISO } from "@/utils/dataFormat";
import { roundToTwoDecimals } from "@/utils/mathUtils";

import { fetchCurrencyValue } from "@/services/CurrencyService";
import { type MoexJson } from "@/utils/moexInfo";
import { getDataByField } from "@/utils/moexInfo";
import * as fundSService from "@/services/FundSService";
import * as stockService from "@/services/StockService";
import * as fundBService from "@/services/FundBService";
import * as bondService from "@/services/BondService";
type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

const fundStockColumns = [
  {
    title: "Created",
    name: "createdAt",
    getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
  },
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
  {
    title: "Created",
    name: "createdAt",
    getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
  },
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

const TableAssets = ({
  assets,
  columns,
  service,
  children,
}: {
  assets: any[];
  columns: any;
  service: any;
  children?: React.ReactNode;
}) =>
  assets.length > 0 && (
    <>
      <h1>{children}</h1>
      <section className="overflow-x-auto">
        <section className="min-w-max w-full max-h-96 overflow-auto rounded-xl">
          <Table
            data={assets}
            actions={(item) => (
              <DeleteButton id={item._id} removeItem={service.remove} />
            )}
            columns={columns}
          />
        </section>
      </section>
    </>
  );

export default async function App() {
  const user = await getCurrentUser();
  const accounts = (await accountSevice.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <h1>Dashboard</h1>
      <MainContainer>
        <FormAssets
          userId={user?.id}
          accounts={accounts}
          getFundEtfServerBody={getFundEtfServerBody}
          getBondServerBody={getBondServerBody}
        />
      </MainContainer>

      {accounts.map(async (account) => {
        const fundsS = (await fundSService.getList(
          user?.id,
          account._id
        )) as any[];

        const stocks = (await stockService.getList(
          user?.id,
          account._id
        )) as any[];

        const fundsB = (await fundBService.getList(
          user?.id,
          account._id
        )) as any[];

        const bonds = (await bondService.getList(
          user?.id,
          account._id
        )) as any[];

        return (
          <MainContainer key={account._id}>
            <h1 className="text-xl font-bold text-darkMain dark:text-white w-full">
              {account.shortName}
            </h1>

            <TableAssets
              assets={fundsS}
              columns={fundStockColumns}
              service={fundSService}
            >
              ETF stocks
            </TableAssets>

            <TableAssets
              assets={stocks}
              columns={fundStockColumns}
              service={stockService}
            >
              Stocks
            </TableAssets>

            <TableAssets
              assets={fundsB}
              columns={fundStockColumns}
              service={fundBService}
            >
              ETF bonds
            </TableAssets>

            <TableAssets
              assets={bonds}
              columns={bondColumns}
              service={bondService}
            >
              Bonds
            </TableAssets>
          </MainContainer>
        );
      })}
    </div>
  );
}
