"use client";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import Image from "next/image";
import { Heading } from "@/components/Heading";
import { Fragment } from "react";
import { getLocalDateByISO } from "@/utils/dataFormat";

export const TableAssets = ({
  trigger,
  userId,
  accountId,
  service,
  children,
  updatePageContent,
}: {
  trigger: boolean;
  userId: string | undefined;
  accountId: string | undefined;
  service: any;
  children?: React.ReactNode;
  updatePageContent: () => Promise<void>;
}) => {
  const [assets, setAssets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTableAssetsData();
  }, [trigger]);

  async function fetchTableAssetsData() {
    try {
      const assets = (await service.getList(userId, accountId)) as any[];

      setAssets(assets);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(getErrorMessage(error));
    }
  }

  const Loading = () => (
    <div className=" w-full">
      <div className="flex animate-pulse space-x-4">
        <div className="flex flex-col gap-4 py-1 w-full">
          <div className="h-7 rounded bg-darkGray w-28"></div>

          <div className="h-7 rounded bg-darkGray"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 h-7 rounded bg-darkGray"></div>
              <div className="col-span-2 h-7 rounded bg-darkGray"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-7 rounded bg-darkGray"></div>
              <div className="col-span-1 h-7 rounded bg-darkGray"></div>
            </div>
            <div className="h-7 rounded bg-darkGray"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    assets.length > 0 && (
      <>
        <Heading>{children}</Heading>
        <section className="overflow-x-auto">
          <section className="min-w-max w-full max-h-96 overflow-auto rounded-xl">
            {assets?.map((asset: any) => (
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
                      <span>{asset.name}</span>
                      {asset.ticker !== "SUR" && (
                        <span className="text-sm text-gray-500">
                          {asset.amount} pcs
                        </span>
                      )}
                      {/* <span className="text-xs">
                        {getLocalDateByISO(asset.updatedAt)}
                      </span> */}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="font-bold">{asset.total} ₽</span>
                      {asset.ticker !== "SUR" && (
                        <span className="text-sm text-gray-500">
                          {asset.price} ₽
                        </span>
                      )}
                    </div>
                    <DeleteButton
                      id={asset._id}
                      removeItem={service.remove}
                      updatePageContent={updatePageContent}
                    />
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
