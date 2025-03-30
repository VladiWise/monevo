import { SingleSection } from "../SingleSection";
import { MainBlockWrapper } from "../MainBlockWrapper";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { type Data } from "@/app/client/home/page";

import { formatNumberWithSpaces } from "@/utils/mathUtils";

import { getAssetsInfoByUserId } from "@/services/HomeService";

import { CURRENCY } from "@/utils/constants";
import { error } from "console";

export type CurrenciesType = {
  currency: keyof typeof CURRENCY;
  name: (typeof CURRENCY)[keyof typeof CURRENCY];
  value: number;
};

export async function Categories({
  isLeftSection,
}: {
  isLeftSection?: boolean;
}) {
  const user = await getCurrentUser();


  const data = (await getAssetsInfoByUserId(user.id!)) as Data;

  const totalAssets =
    data?.bonds +
    data?.stocks +
    data?.cashBroker +
    data?.deposit +
    data?.cashFree;


  return (
    <MainBlockWrapper title="Categories">
      <section className=" grid grid-cols-[3fr_3fr_1fr] w-full items-center gap-x-2 gap-1 ">
        <SingleSection
          title="Deposits"
          value={data?.deposit}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Bonds"
          value={data?.bonds}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Stocks"
          value={data?.stocks}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Cash broker"
          value={data?.cashBroker}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Cash free"
          value={data?.cashFree}
          totalAssets={totalAssets}
        />
        <SingleSection
          title="Loans"
          value={data?.loan}
          totalAssets={totalAssets}
        />
      </section>

      <div className={"flex items-center justify-between w-full"}>
        <span className="text-lg dark:text-white font-medium">
          Total capital
        </span>
        <span className="text-lg dark:text-white font-bold">
          {`${formatNumberWithSpaces(totalAssets)} ₽`}
        </span>
      </div>
    </MainBlockWrapper>
  );
}
