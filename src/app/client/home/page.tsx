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

export default async function App() {
  const user = await getCurrentUser();
  const data = await getAssetsInfoByUserId(user?.id);

  return (
    <div className="flex flex-col gap-10 sm:p-4 w-full h-full items-center text-sm font-light">
      <MainContainer className="max-w-96 items-center dark:text-white">
        Total assets in RUB
        <section className="h-44 flex flex-col items-center justify-center">
          <span className="text-2xl dark:text-white font-bold">
            {`   ${formatNumberWithSpaces(data.bonds + data.stocks)}  ₽`}
          </span>
          <span className="text-green-500 dark:text-white font-medium">
            + 144 555P | 23.45%
          </span>

          <UpdateMoexButton userId={user?.id} />
        </section>
      </MainContainer>
    </div>
  );

  function formatNumberWithSpaces(number: number) {
    const roundedNumber = roundToTwoDecimals(number);
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
