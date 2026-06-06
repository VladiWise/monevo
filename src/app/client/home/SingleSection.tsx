import { roundToTwoDecimals, formatNumberWithSpaces } from "@/utils/mathUtils";

export function SingleSection({
  value,
  title,
  totalAssets,
}: {
  value: number;
  title: string;
  totalAssets: number;
}) {
  return (
    <>
      {/* <div className={clsx("flex items-center justify-between w-full")}> */}
      <span className="text-base dark:text-white font-medium">{title}</span>
      <span className="text-base dark:text-white font-bold justify-self-end">
        {formatNumberWithSpaces(value)} ₽
      </span>
      <span className="text-sm dark:text-white font-light justify-self-end">
        {totalAssets == 0 ? 0 : roundToTwoDecimals((value / totalAssets) * 100)}
        %
      </span>
    </>
  );
}
