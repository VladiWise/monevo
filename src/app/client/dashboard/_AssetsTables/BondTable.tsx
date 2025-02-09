import { fetchBondInfo } from "@/services/MoexService";
import { type MoexJson } from "@/utils/moexInfo";
import { getLocalDateByISO } from "@/utils/dataFormat";
import * as bondService from "@/services/BondService";
import { fetchCurrencyValue } from "@/services/CurrencyService";

import { DataTable } from "@/components/DataTable";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";

interface BondTableProps {
  bankAccounts: any;
  findAmountById: (item: any, accountId: string) => number;
  getDataByField: (moexJson: MoexJson, field: string) => any;
}

export async function BondTable({
  bankAccounts,
  findAmountById,
  getDataByField,
}: BondTableProps) {
  const currentUser = await getCurrentUser();
  const serverItems = await bondService.getList(currentUser?.id);

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

    ...bankAccounts?.map((bankAccount: any) => ({
      title: bankAccount.shortName,
      name: bankAccount._id,
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
      bankAccounts={bankAccounts}
      serverItems={serverItems}
      getEtfServerBody={getBondServerBody}
      service={serviceEtf}
      columns={bondColumns}
      buttonName="ADD BOND"
      title="Bonds"
    />
  );
}
