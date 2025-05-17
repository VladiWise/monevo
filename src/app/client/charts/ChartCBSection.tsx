import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateCBButton } from "./UpdateCBButton";
import { ChartCBServerFetch } from "./ChartCBServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";
import { Button } from "@/components/Button";

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
    <section className="w-full h-52 sm:h-64 md:h-80 xl:h-[36rem] flex items-center justify-center">
      <Loader size={100} />
    </section>
  );

  return (
    <>
      <MainContainer className="w-full h-full items-center relative">
        <Heading className="text-center max-w-60 sm:max-w-72 lg:max-w-full">{title}</Heading>


        <Suspense fallback={<SuspenseLoading />}>
          <ChartCBServerFetch chartData={chartData} />
        </Suspense>
        <Link
          target="_blank"
          href={"https://www.cbr.ru/statistics/data-service/"}
          className="hover:underline underline-offset-2 text-darkMain/50 dark:text-white/50 hover:text-darkMain/80 dark:hover:text-white/80 active:text-black"
        >
          Data source: Bank of Russia
        </Link>
        <UpdateCBButton type={chartData}>Update</UpdateCBButton>
      </MainContainer>
    </>
  );
}
