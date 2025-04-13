
import { Heading } from "@/components/Heading";

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
  children?: React.ReactNode;
}) => {
  const assets = (await service.getList(userId, accountId)) as any[];

  console.log("assets", assets);

  return (
    assets.length > 0 && (
      <>
        <Heading>{children}</Heading>
        <section className="overflow-x-auto">
          <section className="min-w-max w-full overflow-auto rounded-xl">
            {assets.map((asset) => (
              <AssetInfoCard
                key={asset._id}
                asset={asset}
                iconSrc={asset.ticker}
                altIconSrc={asset.ticker}
              />
            ))}
          </section>
        </section>
      </>
    )
  );
};
