"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { updateMoexInfoByUserId } from "@/services/HomeService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export function UpdateMoexButton({
  userId,
  updateContent,
}: {
  userId: string | undefined;
  updateContent: () => Promise<void>;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateMoexInfoByUserId(userId: string) {
    try {
      setIsLoading(true);

      await toast.promise(
        updateMoexInfoByUserId(userId)
          .then(() => updateContent())
          .then(() => router.refresh()),
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
