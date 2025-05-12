import { ChartMESection } from "./ChartMESection";
import { ChartCBSection } from "./ChartCBSection";

export default async function ChartsPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <ChartCBSection title="deposit" chartData="deposit" />

      <ChartCBSection title="credit" chartData="credit" />

      <ChartMESection SECID="RUCBTR2B3B" chartData="avgYield" />
      <ChartMESection SECID="RGBITR" chartData="avgYield" />

      <ChartMESection SECID="IMOEX" chartData="value" />

      <ChartMESection SECID="MCFTR" chartData="value" />

      <ChartMESection SECID="RUSFAR" chartData="value" />
      <ChartMESection SECID="RUSFAR3M" chartData="value" />

      <ChartMESection SECID="RVI" chartData="value" />

      <ChartMESection SECID="MREDC" chartData="value" />
    </div>
  );
}
