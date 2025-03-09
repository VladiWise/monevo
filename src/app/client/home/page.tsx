import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import {
  getAssetsInfoByUserId,
  getCurrenciesInfoByUserId,
  updateMoexInfoByUserId,
} from "@/services/HomeService";
import { MainContainer } from "@/components/MainContainer";
import { CardIcon } from "@/components/SvgIcons";
import { Button } from "@/components/Button";
import { UpdateMoexButton } from "./UpdateMoexButton";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { MainAssetBoard } from "./MainAssetBoard";
import * as totalService from "@/services/TotalService";
import { CURRENCY } from "@/utils/constants";

export type Data = {
  bonds: number;
  stocks: number;
  cashBroker: number;
  cashFree: number;
  deposit: number;
  loan: number;
};

export type Currencies = {
  currency: keyof typeof CURRENCY;
  name:  typeof CURRENCY[keyof typeof CURRENCY];
  value: number;
};


export default async function App() {
  const user = await getCurrentUser();
  const data = (await getAssetsInfoByUserId(user?.id)) as Data;
  const currencyCategories = (await getCurrenciesInfoByUserId(user?.id)) as Currencies[];

  

  const totalPrev = await totalService.getByUserId(user?.id);

  const USD = await fetchCurrencyValue("USD");
  const EUR = await fetchCurrencyValue("EUR");
  const GBP = await fetchCurrencyValue("GBP");
  const CNY = await fetchCurrencyValue("CNY");

  return (
    <div className="flex flex-col items-center w-full gap-10 md:grid md:grid-cols-2  ">
      <MainAssetBoard
        userId={user?.id}
        data={data}
        currencies={{ USD, EUR, GBP, CNY }}
        totalPrev={totalPrev}
        currencyCategories={currencyCategories}
      />
    </div>
  );
}
