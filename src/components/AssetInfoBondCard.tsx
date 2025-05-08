import { AssetInfoString } from "./AssetInfoString";
import Image from "next/image";
import { MainContainer } from "@/components/MainContainer";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { calculateYearsMonthsDays } from "@/utils/dataFormat";

export function AssetInfoBondCard({
  asset,
  imgSrc,
  handleError,
}: {
  asset: any;
  imgSrc: string;
  handleError: () => void;
}) {
  const getCurrencyCode = (currency: string) => {
    if (currency == "SUR") {
      return "RUB";
    } else {
      return currency;
    }
  };

  return (
    <>
      <MainContainer>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Image
              src={`/asset-icons/${imgSrc}.png`}
              onError={handleError}
              alt={"user"}
              width={45}
              height={45}
              className="rounded-full "
            />

            <div className="flex flex-col gap-1">
              <span className="font-bold">
                {formatNumberWithSpaces(asset.price, 2)} ₽
              </span>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumberWithSpaces(asset.percentPrice, 2)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <span className="font-bold">{asset.bondYield}%</span>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({getCurrencyCode(asset.currency)})
            </span>
          </div>
        </div>
      </MainContainer>

      <MainContainer>
        <section className=" grid grid-cols-[1fr_1fr] w-full items-center gap-x-2 gap-1 ">
          <AssetInfoString title="Amount" bold>
            {formatNumberWithSpaces(asset.amount, 2)} pcs
          </AssetInfoString>

          <AssetInfoString title="Total value" bold>
            {formatNumberWithSpaces(asset.total, 2)} ₽
          </AssetInfoString>
        </section>
      </MainContainer>
      <MainContainer>
        <section className=" grid grid-cols-[1fr_1fr] w-full items-center gap-x-2 gap-2">
          <AssetInfoString title="Nominal value">
            {formatNumberWithSpaces(asset.nominal, 2)}{" "}
            {getCurrencyCode(asset.currency)}
          </AssetInfoString>

          <AssetInfoString title="Accrued coupon">
            {formatNumberWithSpaces(asset.coupon, 2)} RUB
          </AssetInfoString>

          <AssetInfoString title="Coupon value">
            {formatNumberWithSpaces(asset.couponValue, 2)}{" "}
            {getCurrencyCode(asset.currency)}
          </AssetInfoString>

          <AssetInfoString title="Next coupon">
            {new Date(asset.nextCoupon).toLocaleDateString("ru")}
          </AssetInfoString>

          <AssetInfoString title="Coupon perion">
            {asset.couponPerion} days
          </AssetInfoString>

          <AssetInfoString title="Mat date">
            {new Date(asset.matDate).toLocaleDateString("ru")}
          </AssetInfoString>

          <AssetInfoString title="Time to maturity">
            {calculateYearsMonthsDays(asset.matDate)}
          </AssetInfoString>

          <AssetInfoString title="Full name">{asset.fullname}</AssetInfoString>

          <AssetInfoString title="Security code">
            {asset.ticker}
          </AssetInfoString>

          <AssetInfoString title="Security type">
            {asset.securityType}
          </AssetInfoString>
        </section>
      </MainContainer>
    </>
  );
}
