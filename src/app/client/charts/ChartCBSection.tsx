import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateCBButton } from "./UpdateCBButton";
import { ChartCBServerFetch } from "./ChartCBServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

import { IndexCBType } from "@/types";

export async function ChartCBSection({
  SECID,
  chartData,
}: {
  SECID: string;
  chartData: IndexCBType;
}) {
  const SuspenseLoading = () => (
    <section className="w-full h-40 sm:h-48 md:h-64 xl:h-[36rem] flex items-center justify-center">
      <Loader size={100} />
    </section>
  );

  return (
    <>
      <MainContainer className="w-full h-full items-center">
        <UpdateCBButton type={chartData}>Update</UpdateCBButton>
        <Heading className="text-center">{SECID}</Heading>

        <Suspense fallback={<SuspenseLoading />}>
          <ChartCBServerFetch SECID={SECID} chartData={chartData} />
        </Suspense>
      </MainContainer>
    </>
  );
}
