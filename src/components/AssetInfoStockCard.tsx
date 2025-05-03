import { AssetInfoString } from "./AssetInfoString";
import Image from "next/image";
import { MainContainer } from "@/components/MainContainer";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { calculateYearsAndMonths } from "@/utils/dataFormat";

export function AssetInfoStockCard({
  asset,
  imgSrc,
  handleError,
}: {
  asset: any;
  imgSrc: string;
  handleError: () => void;
}) {
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
              <span className="font-bold text-lg">
                {formatNumberWithSpaces(asset.price, 2)} ₽
              </span>
            </div>
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
          <AssetInfoString title="Full name">{asset.fullname}</AssetInfoString>

          <AssetInfoString title="Ticker">{asset.ticker}</AssetInfoString>

          <AssetInfoString title="ISIN Code">{asset.ISINCode}</AssetInfoString>

          <AssetInfoString title="Security type">
            {asset.securityType}
          </AssetInfoString>
        </section>
      </MainContainer>
    </>
  );
}
