import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateButton } from "./UpdateButton";
import { ChartServerFetch } from "./ChartServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import Link from "next/link";

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
      <MainContainer className="w-full h-full items-center ">
        <UpdateButton SECID={SECID}>Update</UpdateButton>
        <Heading className="text-center">{title}</Heading>


        <Suspense fallback={<SuspenseLoading />}>
          <ChartServerFetch SECID={SECID} chartData={chartData} />
        </Suspense>
        <Link
          target="_blank"
          href={"https://www.moex.com/ru/indices"}
          className="hover:underline underline-offset-2 text-darkMain/50 dark:text-white/50 hover:text-darkMain/80 dark:hover:text-white/80 active:text-black"
        >
          Data source: Moscow Exchange indices
        </Link>
      </MainContainer>
    </>
  );
}
