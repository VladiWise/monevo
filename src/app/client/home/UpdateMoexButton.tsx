"use client";
import { Button } from "@/components/Button";
import { updateMoexInfoByUserId } from "@/services/HomeService";
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

  async function handleUpdateMoexInfoByUserId(userId: string) {
    toast
      .promise(
        updateMoexInfoByUserId(userId)
          .then(() => updateContent())
          .then(() => router.refresh()),
        {
          loading: "Updating data...",
          success: "Data successfully updated",
        }
      )
      .catch((error) => {
        toast.error(error?.message || "Failed to update data.");
      });
  }

  return (
    <Button variant="link" onClick={() => handleUpdateMoexInfoByUserId(userId!)}>
      Refresh
    </Button>
  );
}
