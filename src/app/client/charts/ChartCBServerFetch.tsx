import { getDBIndexCB } from "@/services/IndexCBService";
import { TimeSeriesChartCB } from "@/components/chart-js/TimeSeriesChartCB";

import { type DB_IndexCBDeposit } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function ChartCBServerFetch({
  chartData,
}: {
  chartData: "deposit" | "credit";
}) {
  const data = (await getDBIndexCB(chartData)) as
    | DB_IndexCBDeposit[]
    | { error: string };

  if (!Array.isArray(data) && "error" in data) {
    return <div>{getErrorMessage(data.error)}</div>;
  }

  const YDataArr = [
    {
      title: "91d-180d",
      color: "#EF3226",

      data: data.map((d) => ({ x: new Date(d.date), y: d.value_91d_180d })),
    },
    {
      title: "181d-1y",
      color: "#ab26ef",
      data: data.map((d) => ({ x: new Date(d.date), y: d.value_181d_1y })),
    },
    {
      title: "1y-3y",
      color: "#26e0ef",
      data: data.map((d) => ({ x: new Date(d.date), y: d.value_1y_3y })),
    },

    {
      title: "over 3y",
      color: "#26ef7b",
      data: data.map((d) => ({ x: new Date(d.date), y: d.value_over_3y })),
    },
  ];

  return (
    <>
      <TimeSeriesChartCB YDataArr={YDataArr} />
    </>
  );
}
