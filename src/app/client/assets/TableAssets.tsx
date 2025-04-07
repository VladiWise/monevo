"use client";

import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import { Fragment } from "react";
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { AssetTableLoading } from "@/components/AssetTableLoading";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getLocalDateByISO } from "@/utils/dataFormat";
export const TableAssets = ({
  trigger,
  userId,
  accountId,
  typeOfAssets,
  service,
  children,
  updatePageContent,
}: {
  trigger: boolean;
  userId: string | undefined;
  accountId: string | undefined;
  typeOfAssets: "currency" | "etfStocks" | "stocks" | "etfBonds" | "bonds";
  service: any;
  children?: string;
  updatePageContent: () => Promise<void>;
}) => {
  const [assets, setAssets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchTableAssetsData();
  }, [trigger]);

  async function fetchTableAssetsData() {
    setIsLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    try {
      const assets = (await service.getList(userId, accountId)) as any[];

      setAssets(assets);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(getErrorMessage(error));
    }
  }

  if (isLoading) {
    return <AssetTableLoading title={children} />;
  }

  return (
    assets.length > 0 && (
      <>
        <h1 className="text-xl font-bold text-darkMain dark:text-white w-full">
          {children}
        </h1>
        <section className="overflow-x-auto">
          <section className="min-w-max w-full  overflow-auto rounded-xl">
            {assets?.map((asset: any) => {
              let iconSrc = "";

              switch (typeOfAssets) {
                case "currency":
                  iconSrc = asset.ticker;
                  break;

                case "etfStocks":
                  iconSrc = "etfStocks";
                  break;

                case "etfBonds":
                  iconSrc = "etfBonds";
                  break;

                case "bonds":
                  iconSrc = "bonds";
                  break;

                case "stocks":
                  iconSrc = "stocks";
                  break;

                default:
                  break;
              }
              if (typeOfAssets === "currency") {
              }

              return (
                <Fragment key={asset._id}>
                  <section className="flex items-center justify-between py-3 gap-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={`/asset-icons/${iconSrc}.png`}
                        alt={"user"}
                        width={45}
                        height={45}
                        className="rounded-full "
                      />

                      <div className="flex flex-col gap-1">
                        <span>{asset.name}</span>
                        {asset?.bondYield && (
                          <span className="text-sm text-gray-500">
                            {asset.bondYield} (
                            {asset.currency == "SUR" ? "RUB" : asset.currency})
                          </span>
                        )}
                        {asset.ticker !== "SUR" && (
                          <span className="text-sm text-gray-500">
                            {asset.amount} pcs
                          </span>
                        )}

                        <span className="text-xs">
                          {getLocalDateByISO(asset.updatedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">
                          {formatNumberWithSpaces(asset.total)} ₽
                        </span>

                        {asset?.bondYield && (
                          <span className="text-sm text-gray-500">
                            {asset.matDate}
                          </span>
                        )}
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
              );
            })}
          </section>
        </section>
      </>
    )
  );
};
