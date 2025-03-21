import { MainBlockWrapper } from "../MainBlockWrapper";
import { SingleSection } from "../SingleSection";
import { type Data } from "@/app/client/home/page";

import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import {
  getAssetsInfoByUserId,
  getAssetTypesByUserId,
} from "@/services/HomeService";

import { CURRENCY } from "@/utils/constants";

export type CurrenciesType = {
  currency: keyof typeof CURRENCY;
  name: (typeof CURRENCY)[keyof typeof CURRENCY];
  value: number;
};

export async function TypeOfAssets({
  isLeftSection,
}: {
  isLeftSection?: boolean;
}) {
  const user = await getCurrentUser();
  const data = (await getAssetsInfoByUserId(user?.id)) as Data;
  const IISTotal = await getAssetTypesByUserId(user?.id);

  const totalAssets =
    data?.bonds +
    data?.stocks +
    data?.cashBroker +
    data?.deposit +
    data?.cashFree
    // data?.loan;

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <MainBlockWrapper title="Type of assets" isLeftSection={isLeftSection}>
      <div className="flex flex-col h-full w-full justify-center">
        <section className=" grid grid-cols-[3fr_3fr_1fr] w-full items-center gap-x-2 gap-1 ">
          <SingleSection
            title="Liquid assets"
            value={totalAssets - IISTotal}
            totalAssets={totalAssets}
          />

          <SingleSection
            title="IIS"
            value={IISTotal}
            totalAssets={totalAssets}
          />
        </section>
      </div>
    </MainBlockWrapper>
  );
}
