import { getDBIndexValues, updateIndex } from "@/services/IndexMOEXService";
import { TimeSeriesChart } from "@/components/chart-js/TimeSeriesChart";
import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import { UpdateButton } from "./UpdateButton";

export default async function ChartsPage() {
  const data = await getDBIndexValues("IMOEX");

  return (
    <>
      <UpdateButton SECID="IMOEX">Update</UpdateButton>

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
