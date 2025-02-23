"use client";
import { Button } from "@/components/Button";
import { updateMoexInfoByUserId } from "@/services/HomeService";

import { useNotification } from "@/store/useNotification";
import { useRouter } from "next/navigation";

export function UpdateMoexButton({ userId }: { userId: string | undefined }) {
  const notification = useNotification();
  const router = useRouter();

  async function handleUpdateMoexInfoByUserId(userId: string | undefined) {
    notification
      .promise(updateMoexInfoByUserId(userId), {
        loading: "Updating data...",
        success: "Data successfully updated",
        error: "Failed to update data.",
      })
      .then(() => router.refresh())
      .catch(() => {});
  }

  return (
    <Button onClick={() => handleUpdateMoexInfoByUserId(userId)}>CLICK</Button>
  );
}
