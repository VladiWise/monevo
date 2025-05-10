"use client";
import { getDBIndexValues, updateIndex } from "@/services/IndexMOEXService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";

export function UpdateButton({
  children,
  SECID,
}: {
  children: React.ReactNode;
  SECID: string;
}) {
  const router = useRouter();
  return <Button onClick={handleUpdate}>{children}</Button>;

  async function handleUpdate() {
    toast
      .promise(
        updateIndex(SECID)
          .then((data) => {
            if (data?.error) {
              throw new Error(data.error);
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
