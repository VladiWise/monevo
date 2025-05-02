import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import * as bankAccService from "@/services/BankAccService";
export default async function Page({
  params,
}: {
  params: Promise<{ assetId: string; id: string }>;
}) {
  const { assetId, id } = await params;
  const account = await bankAccService.getOneById(id);
  return (
    <div className="flex flex-col">
      <div className="flex items-center p-4 justify-between sticky top-0 z-40 backdrop-blur-2xl">
        <Link href={`/dynamic/cash/${id}`}>
          <FaArrowLeft size={24} />
        </Link>

        <div className="flex flex-col items-center ">
          <span>{assetId}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{account.shortName}</span>
        </div>

        <FaClock size={24} />
      </div>

      <div className="flex flex-col gap-4 p-4">
        
      </div>
    </div>
  );
}
