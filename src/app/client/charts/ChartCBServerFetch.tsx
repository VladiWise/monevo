import { getDBIndexCB } from "@/services/IndexCBService";
import { TimeSeriesChartCB } from "@/components/chart-js/TimeSeriesChartCB";

import {
  type DB_IndexCBDeposit,
  type IndexCBType,
  type DB_IndexCBLoanVolume,
} from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function ChartCBServerFetch({
  chartData,
}: {
  chartData: IndexCBType;
}) {
  let YDataArr = [];

  switch (chartData) {
    case "credit":
    case "deposit":
      const deposits = await getDBIndexCB<DB_IndexCBDeposit>(chartData);

      if ("error" in deposits) {
        return <div>{getErrorMessage(deposits.error)}</div>;
      }

      YDataArr = [
        // {
        //   title: "91d-180d",
        //   color: "#EF3226",
        //   data: deposits.map((d) => ({
        //     x: new Date(d.date),
        //     y: d.value_91d_180d,
        //   })),
        // },
        {
          title: "181d-1y",
          color: "#ab26ef",
          data: deposits.map((d) => ({
            x: new Date(d.date),
            y: d.value_181d_1y,
          })),
        },
        {
          title: "1y-3y",
          color: "#26e0ef",
          data: deposits.map((d) => ({
            x: new Date(d.date),
            y: d.value_1y_3y,
          })),
        },

        // {
        //   title: "over 3y",
        //   color: "#26ef7b",
        //   data: deposits.map((d) => ({
        //     x: new Date(d.date),
        //     y: d.value_over_3y,
        //   })),
        // },
      ];

      break;

    case "loan":
      const loans = await getDBIndexCB<DB_IndexCBLoanVolume>(chartData);

      if ("error" in loans) {
        return <div>{getErrorMessage(loans.error)}</div>;
      }

      YDataArr = [
        {
          title: "",
          color: "#EF3226",
          data: loans.map((d) => ({ x: new Date(d.date), y: d.value })),
        },
      ];
  }

  return (
    <>
      <TimeSeriesChartCB YDataArr={YDataArr} />
    </>
  );
}
