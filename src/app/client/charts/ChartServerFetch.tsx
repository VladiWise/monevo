import { getDBIndexValues } from "@/services/IndexMOEXService";
import { TimeSeriesChart } from "@/components/chart-js/TimeSeriesChart";

export async function ChartServerFetch({ SECID }: { SECID: string }) {
  const IMOEX = await getDBIndexValues(SECID);

  return (
    <>
      <TimeSeriesChart docs={IMOEX} title={SECID} />
    </>
  );
}
