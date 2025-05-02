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
  typeOfAssets:
    | "funds-b"
    | "funds-s"
    | "bonds"
    | "stocks"
    | "currency"
    | "deposits"
    | "cash-free"
    | "loans";
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
              typeOfAssets={typeOfAssets}
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
    typeOfAssets: "funds-b" | "funds-s" | "bonds"
  | "stocks" | "currency" | "deposits"
  | "cash-free" | "loans"
  ) {
    let iconSrc = "";
    let altIconSrc = "";

    switch (typeOfAssets) {
      case "currency":
        iconSrc = asset.ticker;
        break;

      case "funds-s":
        iconSrc = "shares/" + asset.ticker;
        altIconSrc = "etfStocks";
        break;

      case "funds-b":
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
