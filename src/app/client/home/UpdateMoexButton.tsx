"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { updateMoexInfoByUserId } from "@/services/HomeService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export function UpdateMoexButton({
  userId,
  loadPageData,
}: {
  userId: string | undefined;
  loadPageData: () => Promise<void>;
}) {

  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateMoexInfoByUserId(userId: string) {
    try {
      setIsLoading(true);

      await toast.promise(
        updateMoexInfoByUserId(userId).then(() => loadPageData()),
        {
          loading: "Updating data...",
          success: "Data successfully updated",
        }
      );
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update data."));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="link"
      disabled={isLoading}
      onClick={() => handleUpdateMoexInfoByUserId(userId!)}
    >
      Refresh
    </Button>
  );
}
