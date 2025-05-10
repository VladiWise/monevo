import { getDBIndexValues } from "@/services/IndexMOEXService";
import { TimeSeriesChart } from "@/components/chart-js/TimeSeriesChart";
import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";

export default async function ChartsPage() {
  const data = await getDBIndexValues("IMOEX");

  return (
    <>
      <MainContainer className="w-full h-full items-center">
        <Heading className="text-center">IMOEX</Heading>
        
        <TimeSeriesChart docs={data} title={"IMOEX"} />
      </MainContainer>

      <MainContainer className="w-full h-full">
        <TimeSeriesChart docs={data} title={"IMOEX"} />
      </MainContainer>
    </>
  );
}
