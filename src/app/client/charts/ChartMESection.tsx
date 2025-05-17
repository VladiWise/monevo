import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateButton } from "./UpdateButton";
import { ChartServerFetch } from "./ChartServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { DataSourceLink } from "@/components/DataSourceLink";

export async function ChartMESection({
  title,
  SECID,
  chartData,
}: {
  title: string;
  SECID: string;
  chartData: "value" | "yield" | "avgYield";
}) {
  const SuspenseLoading = () => (
    <section className="w-full h-52 sm:h-64 md:h-80 xl:h-[36rem] flex items-center justify-center">
      <Loader size={100} />
    </section>
  );

  return (
    <>
      <MainContainer className="w-full h-full items-center relative">
        <UpdateButton SECID={SECID}>Update</UpdateButton>
        <Heading className="text-center max-w-60 sm:max-w-72 lg:max-w-full">{title}</Heading>

        <Suspense fallback={<SuspenseLoading />}>
          <ChartServerFetch SECID={SECID} chartData={chartData} />
        </Suspense>

        <DataSourceLink
          href="https://www.moex.com/ru/indices"
          label="Data source: Moscow Exchange"
        />
      </MainContainer>
    </>
  );
}
