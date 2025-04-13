import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import { Fragment } from "react";
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { AssetInfoCard } from "@/components/AssetInfoCard";

export const TableAssets = async ({
  userId,
  accountId,
  service,
  children,
  typeOfAssets,
}: {
  userId: string | undefined;
  accountId: string | undefined;
  service: any;
  children?: React.ReactNode;
  typeOfAssets: "currency" | "etfStocks" | "stocks" | "etfBonds" | "bonds";
}) => {
  const assets = (await service.getList(userId, accountId)) as any[];

  return (
    assets.length > 0 && (
      <>
        <h1 className="text-xl font-bold text-darkMain dark:text-white w-full">
          {children}
        </h1>
        <section className="overflow-x-auto">
          <section className="min-w-max w-full max-h-96 overflow-auto rounded-xl">
            {assets?.map((asset: any) => {
              const { iconSrc, altIconSrc } = getIconsSrc(asset, typeOfAssets);

              return (
                <AssetInfoCard
                  key={asset._id}
                  asset={asset}
                  iconSrc={iconSrc}
                  altIconSrc={altIconSrc}
                />
              );
            })}
          </section>
        </section>
      </>
    )
  );

  function getIconsSrc(
    asset: any,
    typeOfAssets: "currency" | "etfStocks" | "stocks" | "etfBonds" | "bonds"
  ) {
    let iconSrc = "";
    let altIconSrc = "";

    switch (typeOfAssets) {
      case "currency":
        iconSrc = asset.ticker;
        break;

      case "etfStocks":
        iconSrc = "shares/" + asset.ticker;
        altIconSrc = "etfStocks";
        break;

      case "etfBonds":
        iconSrc = "shares/" + asset.ticker;
        altIconSrc = "etfBonds";
        break;

      case "bonds":
        iconSrc = asset.ticker.startsWith("SU") ? "bonds/SU_RMFS" : "bonds";
        altIconSrc = "bonds";
        break;

      case "stocks":
        iconSrc = "shares/" + asset.ticker;
        altIconSrc = "stocks";
        break;

      default:
        break;
    }

    return {
      iconSrc,
      altIconSrc,
    };
  }
};
