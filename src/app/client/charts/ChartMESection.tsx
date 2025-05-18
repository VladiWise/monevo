import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateButton } from "./UpdateButton";
import { ChartServerFetch } from "./ChartServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { DataSourceLink } from "@/components/DataSourceLink";
import { getAnnualizedIndexByYears } from "@/services/IndexMOEXService";

export async function ChartMESection({
  title,
  SECID,
  chartData,
  isInfoSection,
}: {
  title: string;
  SECID: string;
  chartData: "value" | "yield" | "avgYield";
  isInfoSection?: boolean;
}) {
  const SuspenseLoading = () => (
    <section className="w-full h-80 xl:h-[36rem] flex items-center justify-center">
      <Loader size={100} />
    </section>
  );

  const [yield1, yield3, yield5, yield10, yieldFull] = await Promise.all([
    getAnnualizedIndexByYears(SECID, 1),
    getAnnualizedIndexByYears(SECID, 3),
    getAnnualizedIndexByYears(SECID, 5),
    getAnnualizedIndexByYears(SECID, 10),
    getAnnualizedIndexByYears(SECID),
  ]);

  const GridSection = ({
    label,
    yieldObj,
  }: {
    label: string;
    yieldObj: { data?: number };
  }) => (
    <>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-right">
        {yieldObj.data ? yieldObj.data.toFixed(2) : "-"}%
      </span>
    </>
  );

  return (
    <>
      <MainContainer className="w-full h-full items-center relative">
        <UpdateButton SECID={SECID}>Update</UpdateButton>
        <Heading className="text-center max-w-60 sm:max-w-72 lg:max-w-full">
          {title}
        </Heading>

        <Suspense fallback={<SuspenseLoading />}>
          <ChartServerFetch SECID={SECID} chartData={chartData} />
        </Suspense>

        <DataSourceLink
          href="https://www.moex.com/ru/indices"
          label="Data source: Moscow Exchange"
        />

        {isInfoSection && (
          <section className=" grid grid-cols-[1.5fr_1fr] gap-x-2 gap-1 w-full lg:w-auto">
            <GridSection label="Annual yield for 1y" yieldObj={yield1} />

            <GridSection label="Annual yield for 3y" yieldObj={yield3} />

            <GridSection label="Annual yield for 5y" yieldObj={yield5} />

            <GridSection label="Annual yield for 10y" yieldObj={yield10} />

            <GridSection
              label="Annual yield for full period"
              yieldObj={yieldFull}
            />
          </section>
        )}


        
      </MainContainer>
    </>
  );
}
