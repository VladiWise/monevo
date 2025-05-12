import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateCBButton } from "./UpdateCBButton";
import { ChartCBServerFetch } from "./ChartCBServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

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
      <MainContainer className="w-full h-full items-center">
        <Heading className="text-center">{title}</Heading>

        <Suspense fallback={<SuspenseLoading />}>
          <ChartCBServerFetch chartData={chartData} />
        </Suspense>
        <UpdateCBButton type={chartData}>Update</UpdateCBButton>
      </MainContainer>
    </>
  );
}
