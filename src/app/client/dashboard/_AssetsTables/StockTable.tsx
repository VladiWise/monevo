import { fetchStockETFInfo } from "@/services/MoexService";
import { type MoexJson } from "@/utils/moexInfo";
import { getLocalDateByISO } from "@/utils/dataFormat";
import * as stockService from "@/services/StockService";

import { DataTable } from "@/components/DataTable";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";

interface StockTableProps {
  bankAccounts: any;
  findAmountById: (item: any, accountId: string) => number;
  getDataByField: (moexJson: MoexJson, field: string) => any;
}

export async function StockTable({
  bankAccounts,
  findAmountById,
  getDataByField,
}: StockTableProps) {
  const currentUser = await getCurrentUser();
  const serverItems = await stockService.getList(currentUser?.id);

  const etfColumns = [
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
      title: "Total",
      name: "total",
    },
  ];

  const getEtfServerBody = async (item: any, data: any, moexJson: MoexJson) => {
    "use server";
    return {
      id: item?._id,
      accountId: data.accountId,
      ticker: data.ticker,
      amount: data.amount,
      name: await getDataByField(moexJson, "name"),
      currency: await getDataByField(moexJson, "currency"),
      price: await getDataByField(moexJson, "price"),
    };
  };

  const serviceEtf = {
    getMoex: fetchStockETFInfo,
    create: stockService.create,
    updateAccounts: stockService.updateAccounts,
    remove: stockService.remove,
  };

  return (
    <DataTable
      bankAccounts={bankAccounts}
      serverItems={serverItems}
      getEtfServerBody={getEtfServerBody}
      service={serviceEtf}
      columns={etfColumns}
      buttonName="ADD STOCK"
      title="Stock"
    />
  );
}
