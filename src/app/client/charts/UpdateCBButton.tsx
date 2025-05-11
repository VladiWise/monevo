"use client";
import { updateIndexCB } from "@/services/IndexCBService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { IndexCBType } from "@/types";

import { Button } from "@/components/Button";

export function UpdateCBButton({
  children,
  type,
}: {
  children: React.ReactNode;
  type: IndexCBType;
}) {
  const router = useRouter();
  return <Button onClick={handleUpdate}>{children}</Button>;

  async function handleUpdate() {
    toast
      .promise(
        updateIndexCB(type)
          .then((data) => {
            if (data?.error) {
              throw new Error(data.error);
            }

            if (data?.message) {
              toast.success(data.message);
            }
          })
          .then(() => router.refresh()),
        {
          loading: "Updating data...",
          success: "Data successfully updated!",
        }
      )
      .catch((error) => {
        toast.error(getErrorMessage(error, "Failed to delete data."));
      });
  }
}
