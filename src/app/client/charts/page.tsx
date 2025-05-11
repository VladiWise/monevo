import { ChartSection } from "./ChartSection";
import { ChartCBSection } from "./ChartCBSection";

export default async function ChartsPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <ChartCBSection SECID="deposit" chartData="deposit" />

      <ChartSection SECID="RUCBTR2B3B" chartData="avgYield" />
      <ChartSection SECID="IMOEX" chartData="value" />

      <ChartSection SECID="MCFTR" chartData="value" />

      <ChartSection SECID="RUSFAR" chartData="value" />
      <ChartSection SECID="RUSFAR3M" chartData="value" />

      <ChartSection SECID="RVI" chartData="value" />

      <ChartSection SECID="MREDC" chartData="value" />
    </div>
  );
}
