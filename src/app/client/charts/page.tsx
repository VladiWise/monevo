import { ChartMESection } from "./ChartMESection";
import { ChartCBSection } from "./ChartCBSection";

export default async function ChartsPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <ChartCBSection title="Individual deposit rates, %" chartData="deposit" />
      <ChartCBSection title="Individual credit rates, %" chartData="credit" />
      <ChartCBSection
        title="Volume of loans to individuals, trln"
        chartData="loan"
      />

      <ChartMESection
        title="Fair market credit rate, %"
        SECID="RUCBTR2B3B"
        chartData="avgYield"
      />


      <ChartMESection
        title="Long-term government bonds, %"
        SECID="RUGBITR10Y"
        chartData="avgYield"
      />

      <ChartMESection
        title="Russian stock market"
        SECID="IMOEX"
        chartData="value"
      />
      <ChartMESection
        title="Russian stock market of full profitability"
        SECID="MCFTR"
        chartData="value"
      />

      <ChartMESection
        title="Fair money value, %"
        SECID="RUSFAR3M"
        chartData="value"
      />

      <ChartMESection
        title="Stock market volatility"
        SECID="RVI"
        chartData="value"
      />

      <ChartMESection
        title="Cost per square meter in Moscow, ₽"
        SECID="MREDC"
        chartData="value"
      />
    </div>
  );
}
