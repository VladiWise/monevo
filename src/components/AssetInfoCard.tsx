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

  // Начальные координаты касания
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Порог, при котором считается, что касание было сдвигом
  const MOVE_THRESHOLD = 10;

  const handleError = () => {
    if (imgSrc !== altIconSrc) {
      setImgSrc(altIconSrc);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Если срабатывание инициировано тачем, игнорируем click
    if (touchTriggered.current) {
      touchTriggered.current = false;
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Можно добавить логику, если хотите отменять событие при больших перемещениях
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);

    // Если перемещение больше порогового значения — считаем, что это скролл, а не тап
    if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
      return;
    }

    // Если перемещение минимально, обрабатываем как тап
    e.preventDefault();
    touchTriggered.current = true;
    setIsOpen((prev) => !prev);

    // Сбрасываем флаг через небольшой промежуток, чтобы избежать конфликта
    setTimeout(() => {
      touchTriggered.current = false;
    }, 500);
  };

  return (
    <>
      <section
        className="flex items-center justify-between py-3 px-1 gap-3 cursor-pointer hover:bg-darkMain/20"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
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
