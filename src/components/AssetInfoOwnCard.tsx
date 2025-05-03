"use client";
import { useState } from "react";
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/mathUtils";
import { DeleteButton } from "./DeleteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { calculateYearsAndMonths } from "@/utils/dataFormat";
import { MainContainer } from "@/components/MainContainer";
import { AssetInfoString } from "./AssetInfoString";

import { AssetInfoBondCard } from "./AssetInfoBondCard";
import { AssetInfoStockCard } from "./AssetInfoStockCard";
import { AssetInfoCurrencyCard } from "./AssetInfoCurrencyCard";

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

  switch (typeOfAssets) {
    case "bonds":
      return (
        <section className="flex flex-col gap-4 p-4 h-full">
          <AssetInfoBondCard
            asset={asset}
            imgSrc={imgSrc}
            handleError={handleError}
          />
        </section>
      );

    case "currency":
    case "deposits":
    case "cash-free":
    case "loans":
      return (
        <section className="flex flex-col gap-4 p-4 h-full">
          <AssetInfoCurrencyCard
            asset={asset}
            imgSrc={imgSrc}
            handleError={handleError}
          />
        </section>
      );

    case "stocks":
    case "funds-b":
    case "funds-s":
      return (
        <section className="flex flex-col gap-4 p-4 h-full">
          <AssetInfoStockCard
            asset={asset}
            imgSrc={imgSrc}
            handleError={handleError}
          />
        </section>
      );
    default:
      break;
  }
}
