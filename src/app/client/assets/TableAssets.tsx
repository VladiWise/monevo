import { AssetInfoCard } from "@/components/AssetInfoCard";
import { AssetLayout } from "@/components/AssetLayout";

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
  children: string;
  typeOfAssets: "currency" | "etfStocks" | "stocks" | "etfBonds" | "bonds";
}) => {
  // await new Promise((resolve) => setTimeout(resolve, 10000));
  const assets = (await service.getList(userId, accountId)) as any[];

  return (
    assets.length > 0 && (
      <AssetLayout header={children}>
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
      </AssetLayout>
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
