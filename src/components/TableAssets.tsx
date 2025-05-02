import { AssetInfoCard } from "@/components/AssetInfoCard";
import { AssetLayout } from "@/components/AssetLayout";
import { MainContainer } from "@/components/MainContainer";
import { getIconsSrc } from "@/utils/dataFormat";

export const TableAssets = async ({
  accountId,
  service,
  children,
  typeOfAssets,
}: {
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
  // await new Promise((resolve) => setTimeout(resolve, 6000));
  const assets = (await service.getList(accountId)) as any[];

  return (
    <>
      {assets.length > 0 && (
        <MainContainer>
          <AssetLayout header={children}>
            {assets?.map((asset: any) => {
              const { iconSrc, altIconSrc } = getIconsSrc(
                asset.ticker,
                typeOfAssets
              );

              return (
                <AssetInfoCard
                  key={asset._id}
                  asset={asset}
                  iconSrc={iconSrc}
                  altIconSrc={altIconSrc}
                  typeOfAssets={typeOfAssets}
                />
              );
            })}
          </AssetLayout>
        </MainContainer>
      )}
    </>
  );


};
