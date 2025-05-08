"use client";
import { useState } from "react";
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { DeleteButton } from "./DeleteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateYearsMonthsDays } from "@/utils/dataFormat";
export function AssetInfoCard({
  asset,
  iconSrc,
  altIconSrc,
  typeOfAssets,
}: {
  asset: any;
  iconSrc: string;
  altIconSrc: string;
  typeOfAssets:
    | "funds-b"
    | "funds-s"
    | "bonds"
    | "stocks"
    | "currency"
    | "deposits"
    | "cash-free"
    | "loans";
}) {
  const pathname = usePathname();
  const [imgSrc, setImgSrc] = useState(iconSrc);

  const handleError = () => {
    if (imgSrc !== altIconSrc) {
      setImgSrc(altIconSrc);
    }
  };

  return (
    <Link href={`${pathname}/${typeOfAssets}/${asset._id}`}>
      <section className="flex items-center justify-between py-3 px-1 gap-3 cursor-pointer hover:bg-darkGray/10 hover-none:active:bg-darkGray/20 active:bg-darkGray/20 dark:hover:bg-darkMain/40 dark:hover-none:active:bg-darkMain/80 dark:active:bg-darkMain/80">
        <div className="flex items-center gap-3">
          <Image
            src={`/asset-icons/${imgSrc}.png`}
            onError={handleError}
            alt={"user"}
            width={45}
            height={45}
            className="rounded-full "
          />

          <div className="flex flex-col gap-1">
            <span>{asset.name}</span>
            {asset?.bondYield && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {asset.bondYield}% (
                {asset.currency == "SUR" ? "RUB" : asset.currency})
              </span>
            )}
            {asset.ticker !== "SUR" && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumberWithSpaces(asset.amount)} pcs
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              {formatNumberWithSpaces(asset.total)} ₽
            </span>

            {asset?.bondYield && (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {calculateYearsMonthsDays(asset.matDate)}
              </span>
            )}
            {asset.ticker !== "SUR" && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumberWithSpaces(asset.price, 2)} ₽
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="flex-grow border-t border-gray-200 dark:border-darkMain"></div>
    </Link>
  );
}
