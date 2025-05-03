"use client";
import { Button } from "@/components/Button";

import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
import { type PathName } from "@/services/AssetService";
type DelButtonProps = {
  id: string;
  assetType: PathName;
  removeItem: (assetType: PathName, id: string) => Promise<any>;
  children: React.ReactNode;
};

export function DeleteButton2({
  id,
  assetType,
  removeItem,
  children,
}: DelButtonProps) {
  const router = useRouter();
  async function handleRemove() {
    const removeAnswer = confirm(`You really wanna delete this item?`);

    if (!removeAnswer) return;

    toast
      .promise(
        removeItem(assetType, id)
          .then((data) => {
            if (data?.error) {
              throw new Error(data.error);
            }
          })
          .then(() => router.back()),
        {
          loading: "Deleting data...",
          success: "Data successfully deleted!",
        }
      )
      .catch((error) => {
        toast.error(getErrorMessage(error, "Failed to delete data."));
      });
  }

  return (
    <Button variant="primary" className="w-full max-w-96" onClick={handleRemove}>
      {children}
    </Button>
  );
}
