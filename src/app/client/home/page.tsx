import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import {
  getAssetsInfoByUserId,
  updateMoexInfoByUserId,
} from "@/services/HomeService";
import { MainContainer } from "@/components/MainContainer";
import { CardIcon } from "@/components/SvgIcons";
import { Button } from "@/components/Button";
import { UpdateMoexButton } from "./UpdateMoexButton";
import { roundToTwoDecimals } from "@/utils/mathUtils";
import { fetchCurrencyValue } from "@/services/CurrencyService";
import { MainAssetBoard } from "./MainAssetBoard";
import * as totalService from "@/services/TotalService";  
export default async function App() {
  const user = await getCurrentUser();
  const data = await getAssetsInfoByUserId(user?.id);
  const totalPrev = await totalService.getByUserId(user?.id);

  const usdValue = await fetchCurrencyValue("USD");

  return (
    <div className="flex flex-col gap-10 sm:p-4 w-full h-full items-center text-sm font-light">
      <MainAssetBoard userId={user?.id} data={data} usdValue={usdValue} totalPrev={totalPrev}/>
    </div>
  );
}
