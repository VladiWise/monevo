import { fetchBondInfo } from "@/services/MoexService";
import { type MoexJson } from "@/utils/moexInfo";
import { getLocalDateByISO } from "@/utils/dataFormat";
import * as bondService from "@/services/BondService";
import { fetchCurrencyValue } from "@/services/CurrencyService";

import { DataTable } from "@/components/DataTable";

interface BondTableProps {
  accounts: any;
  findAmountById: (item: any, accountId: string) => number;
  getDataByField: (moexJson: MoexJson, field: string) => any;
}

export async function BondTable({
  accounts,
  findAmountById,
  getDataByField,
}: BondTableProps) {
  const serverItems = await bondService.getList();

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

    ...accounts?.map((account: any) => ({
      title: account.shortName,
      name: account._id,
      getCellContent: (item: any, columnName: string) =>
        findAmountById(item, columnName),
    })),

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
      title: "Total",
      name: "total",
    },
  ];

  const getBondServerBody = async (
    item: any,
    data: any,
    moexJson: MoexJson
  ) => {
    "use server";
    return {
      id: item?._id,
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

  const serviceEtf = {
    getMoex: fetchBondInfo,
    create: bondService.create,
    updateAccounts: bondService.updateAccounts,
    remove: bondService.remove,
  };

  return (
    <DataTable
      accounts={accounts}
      serverItems={serverItems}
      getEtfServerBody={getBondServerBody}
      service={serviceEtf}
      columns={bondColumns}
      buttonName="ADD BOND"
      title="Bonds"
    />
  );
}
