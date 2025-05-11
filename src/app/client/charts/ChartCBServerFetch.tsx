import { getDBIndexCB } from "@/services/IndexCBService";
import { TimeSeriesChartCB } from "@/components/chart-js/TimeSeriesChartCB";

import { type DB_IndexCBDeposit } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function ChartCBServerFetch({
  SECID,
  chartData,
}: {
  SECID: string;
  chartData: "deposit" | "credit";
}) {
  const data = (await getDBIndexCB(chartData)) as DB_IndexCBDeposit[];

  if ("error" in data) {
    return <div>{getErrorMessage(data.error)}</div>;
  }

  const YDataArr = [
    {
      title: "value_91d_180d",
      data: data.map((d) => ({ x: new Date(d.date), y: d.value_91d_180d })),
    },
    {
      title: "value_181d_1y",
      data: data.map((d) => ({ x: new Date(d.date), y: d.value_181d_1y })),
    },
    {
      title: "value_1y_3y",
      data: data.map((d) => ({ x: new Date(d.date), y: d.value_1y_3y })),
    },
  ];

  return (
    <>
      <TimeSeriesChartCB YDataArr={YDataArr} title={SECID} />
    </>
  );
}
