"use client";
import { useState } from "react";
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { DeleteButton } from "./DeleteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateYearsAndMonths } from "@/utils/dataFormat";
import { MainContainer } from "@/components/MainContainer";
export function AssetInfoOwnCard({
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
    <section className="flex flex-col gap-4 p-4 h-full">
      <MainContainer>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Image
              src={`/asset-icons/${imgSrc}.png`}
              onError={handleError}
              alt={"user"}
              width={45}
              height={45}
              className="rounded-full "
            />

            <div className="flex flex-col gap-1">
              <span className="font-bold">
                {formatNumberWithSpaces(asset.price, 2)} ₽
              </span>

              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatNumberWithSpaces(
                  ((asset.price - asset.coupon) / asset.nominal) * 100,
                  2
                )}
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <span className="font-bold">{asset.bondYield}%</span>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({asset.currency == "SUR" ? "RUB" : asset.currency})
            </span>
          </div>
        </div>
      </MainContainer>

      <MainContainer>
        <section className=" grid grid-cols-[1fr_1fr] w-full items-center gap-x-2 gap-1 ">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Amount
          </span>

          <span className="font-bold text-right">{asset.amount} pcs</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total value
          </span>
          <span className="font-bold text-right">
            {formatNumberWithSpaces(asset.total, 2)} ₽
          </span>
        </section>
      </MainContainer>
      <MainContainer>
        <section className=" grid grid-cols-[1fr_1fr] w-full items-center gap-x-2 gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Nominal value
          </span>

          <span className=" text-right">
            {formatNumberWithSpaces(asset.nominal, 2)} ₽
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Accrued coupon
          </span>

          <span className=" text-right">
            {formatNumberWithSpaces(asset.coupon, 2)} ₽
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Coupon value
          </span>

          <span className=" text-right">
            {formatNumberWithSpaces(asset.couponValue, 2)} ₽
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Yield
          </span>
          <span className="text-right">
            {asset.bondYield}%{" "}
            {asset.currency == "SUR" ? "RUB" : asset.currency}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Next coupon
          </span>

          <span className="text-right">
            {new Date(asset.nextCoupon).toLocaleDateString("ru")}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Coupon perion
          </span>
          <span className="text-right">{asset.couponPerion} days</span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Mat date
          </span>
          <span className="text-right">
            {new Date(asset.matDate).toLocaleDateString("ru")}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Time to maturity
          </span>
          <span className="text-right">
            {calculateYearsAndMonths(asset.matDate)}
          </span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Full name
          </span>
          <span className="text-right">{asset.fullname}</span>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Ticker
          </span>
          <span className="text-right">{asset.ticker}</span>
        </section>
      </MainContainer>
    </section>
  );
}
