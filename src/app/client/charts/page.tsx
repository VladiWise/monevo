import { ChartSection } from "./ChartSection";

export default async function ChartsPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      <ChartSection SECID="IMOEX" />

      <ChartSection SECID="RUSFAR" />
    </div>
  );
}
