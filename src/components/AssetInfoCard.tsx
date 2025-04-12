"use client";
import { useState, useRef } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const [imgSrc, setImgSrc] = useState(iconSrc);

  const touchTriggered = useRef(false);
  const handleError = () => {
    if (imgSrc !== altIconSrc) {
      setImgSrc(altIconSrc);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // if (touchTriggered.current) {
    //   touchTriggered.current = false; // сбрасываем флаг на будущее
    //   return;
    // }
    setIsOpen((prev) => !prev);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    // e.preventDefault();
    // touchTriggered.current = true;
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <section
        className="flex items-center justify-between py-3 px-1 gap-3 cursor-pointer hover:bg-darkMain/20"
        onDoubleClick={handleClick}
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
              <span className="text-xs text-gray-500">
                {asset.bondYield} (
                {asset.currency == "SUR" ? "RUB" : asset.currency})
              </span>
            )}
            {asset.ticker !== "SUR" && (
              <span className="text-sm text-gray-500">{asset.amount} pcs</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              {formatNumberWithSpaces(asset.total)} ₽
            </span>

            {asset?.bondYield && (
              <span className="text-xs text-gray-500">{asset.matDate}</span>
            )}
            {asset.ticker !== "SUR" && (
              <span className="text-sm text-gray-500">{asset.price} ₽</span>
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
