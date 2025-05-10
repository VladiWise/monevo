import { getDBIndexValues } from "@/services/IndexMOEXService";
import { TimeSeriesChart } from "@/components/chart-js/TimeSeriesChart";

export async function ChartServerFetch({ SECID }: { SECID: string }) {
  const YData = await getDBIndexValues(SECID);

  return (
    <>
      <TimeSeriesChart YData={YData} title={SECID} />
    </>
  );
}
