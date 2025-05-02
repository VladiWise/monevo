import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import * as brokerAccService from "@/services/BrokerAccService";
import * as assetService from "@/services/AssetService";
import { Button } from "@/components/Button";
import { getIconsSrc } from "@/utils/dataFormat";
import { AssetInfoOwnCard } from "@/components/AssetInfoOwnCard";

export default async function Page({
  params,
}: {
  params: Promise<{
    assetId: string;
    id: string;
    assetType:
      | "funds-b"
      | "funds-s"
      | "bonds"
      | "stocks"
      | "currency"
      | "deposits"
      | "cash-free"
      | "loans";
  }>;
}) {
  const { assetType, assetId, id } = await params;
  const account = await brokerAccService.getOneById(id);
  const asset = await assetService.getOne(assetType, assetId);

  const { iconSrc, altIconSrc } = getIconsSrc(asset.ticker, assetType);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 justify-between sticky top-0 z-40 backdrop-blur-2xl">
        <Link href={`/dynamic/assets/${id}`}>
          <FaArrowLeft size={24} />
        </Link>

        <div className="flex flex-col items-center">
          <span>{asset.name}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {account.shortName}
          </span>
        </div>

        <FaClock size={24} />
      </div>

      <AssetInfoOwnCard
        asset={asset}
        iconSrc={iconSrc}
        altIconSrc={altIconSrc}
        typeOfAssets={assetType}
      />

      <div className="flex items-center p-4 justify-between sticky bottom-0 z-40 gap-4 backdrop-blur-2xl">
        <Button variant="simple" className="w-full">
          Change
        </Button>
        <Button variant="primary" className="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
}
