import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { Fragment } from "react";
import { getLocalDateByISO } from "@/utils/dataFormat";

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
          <section className="min-w-max w-full max-h-96 overflow-auto rounded-xl">
            {assets.map((asset) => (
              <Fragment key={asset._id}>
                <section className="flex items-center justify-between py-3 gap-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/asset-icons/${asset.ticker}.png`}
                      alt={"user"}
                      width={45}
                      height={45}
                      className="rounded-full "
                    />

                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{asset.name}</span>
                      {asset.ticker !== "SUR" && (
                        <span className="text-sm">{asset.amount} pcs</span>
                      )}
                      {/* <span className="text-xs">
                        {getLocalDateByISO(asset.updatedAt)}
                      </span> */}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="font-bold">{asset.total} ₽</span>
                      {asset.ticker !== "SUR" && <span className="text-sm">{asset.price}</span>}
                    </div>
                    <DeleteButton id={asset._id} removeItem={service.remove} />
                  </div>
                </section>

                <div className="flex-grow border-t border-gray-200 dark:border-darkMain"></div>
              </Fragment>
            ))}

            {/* <Table
              data={assets}
              actions={(item) => (
                <DeleteButton id={item._id} removeItem={service.remove} />
              )}
              columns={columns}
            /> */}
          </section>
        </section>
      </>
    )
  );
};
