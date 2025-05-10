import { MainContainer } from "@/components/MainContainer";
import { Heading } from "@/components/Heading";
import { UpdateButton } from "./UpdateButton";
import { ChartServerFetch } from "./ChartServerFetch";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export async function ChartSection({ SECID }: { SECID: string }) {
  const SuspenseLoading = () => (
    <section className="w-full h-40 sm:h-48 md:h-64 xl:h-[36rem] flex items-center justify-center">
      <Loader size={100} />
    </section>
  );

  return (
    <>
      <MainContainer className="w-full h-full items-center">
        <UpdateButton SECID={SECID}>Update</UpdateButton>
        <Heading className="text-center">{SECID}</Heading>

        <Suspense fallback={<SuspenseLoading />}>
          <ChartServerFetch SECID={SECID} />
        </Suspense>
      </MainContainer>

      <MainContainer>fhgfhg</MainContainer>
    </>
  );
}
