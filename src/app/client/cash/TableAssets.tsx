import { AssetLayout } from "@/components/AssetLayout";
import { AssetInfoCard } from "@/components/AssetInfoCard";

export const TableAssets = async ({
  userId,
  accountId,
  columns,
  service,
  children,
}: {
  userId: string | undefined;
  accountId: string | undefined;
  columns: any;
  service: any;
  children: string;
}) => {
  const assets = (await service.getList(userId, accountId)) as any[];

  console.log("assets", assets);

  return (
    assets.length > 0 && (
      <AssetLayout header={children}>
        {assets.map((asset) => (
          <AssetInfoCard
            key={asset._id}
            asset={asset}
            iconSrc={asset.ticker}
            altIconSrc={asset.ticker}
            typeOfAssets="currency"
          />
        ))}
      </AssetLayout>
    )
  );
};
