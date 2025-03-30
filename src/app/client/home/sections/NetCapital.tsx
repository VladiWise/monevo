import { SuspenseMainBlockWrapper } from "../SuspenseMainBlockWrapper";

import { MainContainer } from "@/components/MainContainer";
import { UpdateMoexButton } from "../UpdateMoexButton";
import { Button } from "@/components/Button";
import { CgArrowsExchangeV } from "react-icons/cg";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { useNotification } from "@/store/useNotification";
import { MainBlockWrapper } from "../MainBlockWrapper";
import * as totalService from "@/services/TotalService";

import { Data } from "@/app/client/home/page";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { getAssetsInfoByUserId } from "@/services/HomeService";
import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";

import { NetCapitalClient } from "./NetCapitalClient";

export async function NetCapital({
  userId,
  isLeftSection,
}: {
  userId: string | undefined;
  isLeftSection?: boolean;
}) {
  const user = await getCurrentUser();
  if (!user) return null;

  const data = await getAssetsInfoByUserId(userId!);
  const totalPrev = await totalService.getByUserId(userId);
  const USD = await fetchCurrencyValue("USD");

  const currentSum =
    +data?.bonds +
    +data?.stocks +
    +data?.cashBroker +
    +data?.deposit +
    +data?.cashFree -
    +data?.loan;
  const prevSum =
    +totalPrev?.total?.assets?.bonds +
    +totalPrev?.total?.assets?.stocks +
    +totalPrev?.total?.assets?.cashBroker +
    +totalPrev?.total?.assets?.deposit +
    +totalPrev?.total?.assets?.cashFree -
    +totalPrev?.total?.assets?.loan;

  return (
    <NetCapitalClient
      userId={userId}
      isLeftSection={isLeftSection}
      data={data}
      totalPrev={totalPrev}
      USD={USD}
      currentSum={currentSum}
      prevSum={prevSum}
    />
  );
}
