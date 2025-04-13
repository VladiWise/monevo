"use client";
import { useState } from "react";
import { useClickTouch } from "@/hooks/useClickTouch";
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/mathUtils";

export function AssetInfoCard({
  asset,
  iconSrc,
  altIconSrc,
}: {
  asset: any;
  iconSrc: string;
  altIconSrc: string;
}) {
  const setIsOpenCallback = () => setIsOpen((prev) => !prev);

  const [handleClick, handleTouchStart, handleTouchEnd] =
    useClickTouch(setIsOpenCallback);

  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(iconSrc);

  const handleError = () => {
    if (imgSrc !== altIconSrc) {
      setImgSrc(altIconSrc);
    }
  };

  return (
    <>
      <section
        className="flex items-center justify-between py-3 px-1 gap-3 cursor-pointer hover:bg-darkMain/20"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
                {asset.bondYield} (
                {asset.currency == "SUR" ? "RUB" : asset.currency})
              </span>
            )}
            {asset.ticker !== "SUR" && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {asset.amount} pcs
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
                {asset.matDate}
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

      {isOpen && (
        <div
          className={
            "p-4 text-center transition-colors duration-1000 cursor-pointer bg-blue-500"
          }
        >
          Активирован
        </div>
      )}
    </>
  );
}
