import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateCBButton } from "./UpdateCBButton";
import { ChartCBServerFetch } from "./ChartCBServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { Button } from "@/components/Button";
import { DataSourceLink } from "@/components/DataSourceLink";

import { IndexCBType } from "@/types";
import { title } from "process";

export async function ChartCBSection({
  title,
  chartData,
}: {
  title: string;
  chartData: IndexCBType;
}) {
  const SuspenseLoading = () => (
    <section className="w-full h-80 xl:h-[36rem] flex items-center justify-center">
      <Loader size={100} />
    </section>
  );

  return (
    <>
      <MainContainer className="w-full h-full items-center relative">
        <Heading className="text-center max-w-60 sm:max-w-72 lg:max-w-full">
          {title}
        </Heading>

        <Suspense fallback={<SuspenseLoading />}>
          <ChartCBServerFetch chartData={chartData} />
        </Suspense>

        <DataSourceLink
          href="https://www.cbr.ru/statistics/data-service/"
          label="Data source: Bank of Russia"
        />
        <UpdateCBButton type={chartData}>Update</UpdateCBButton>
      </MainContainer>
    </>
  );
}
