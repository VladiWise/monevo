import { ChartMESection } from "./ChartMESection";
import { ChartCBSection } from "./ChartCBSection";

export default async function ChartsPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <ChartCBSection
        title="Deposit and loan rates (181d – 1y), %"
        chartData="dep_cred_181d_1y"
      />
      <ChartCBSection
        title="Deposit and loan rates (1y - 3y), %"
        chartData="dep_cred_1y_3y"
      />

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
        title="Russian bond market yield, %"
        SECID="RUABITR"
        chartData="avgYield"
        isInfoSection={true}
      />

      <ChartMESection
        title="Russian stock market"
        SECID="IMOEX"
        chartData="value"
        isInfoSection={true}
      />
      <ChartMESection
        title="Russian stock market of full profitability"
        SECID="MCFTR"
        chartData="value"
        isInfoSection={true}
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
        isInfoSection={true}
      />
    </div>
  );
}
