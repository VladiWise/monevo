import { getDBIndexValues } from "@/services/IndexMOEXService";
import { TimeSeriesChart } from "@/components/chart-js/TimeSeriesChart";

import { type IndexMoex } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function ChartServerFetch({
  SECID,
  chartData,
}: {
  SECID: string;
  chartData: "value" | "yield" | "avgYield";
}) {
  const data = (await getDBIndexValues(SECID)) as
    | IndexMoex[]
    | { error: string };

  if ("error" in data) {
    return <div>{getErrorMessage(data.error)}</div>;
  }

  let YData: { x: Date; y: number }[] = [];

  if (chartData === "avgYield") {
    const dataWithAvgYield = withAvgYield(data, 7);

    YData = dataWithAvgYield.map((d) => ({
      x: new Date(d.date),
      y: d[chartData],
    }));
  } else {
    YData = data.map((d) => ({ x: new Date(d.date), y: d[chartData] }));
  }

  return (
    <>
      <TimeSeriesChart YData={YData} title={SECID} />
    </>
  );

  function withAvgYield(data: IndexMoex[], period = 7) {
    return data.map((point, i, arr) => {
      const end = Math.min(arr.length, i + period);
      const windowSlice = arr.slice(i, end);
      const sum = windowSlice.reduce((acc, p) => acc + p.yield, 0);
      const avg = sum / windowSlice.length;
      return { ...point, avgYield: Math.round(avg * 100) / 100 };
    });
  }
}
