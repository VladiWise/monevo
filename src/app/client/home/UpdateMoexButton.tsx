"use client";
import { Button } from "@/components/Button";
import { updateMoexInfoByUserId } from "@/services/HomeService";
import toast from "react-hot-toast";
import { useNotification } from "@/store/useNotification";
import { useRouter } from "next/navigation";

export function UpdateMoexButton({
  userId,
  updateContent,
}: {
  userId: string | undefined;
  updateContent: () => Promise<void>;
}) {
  const notification = useNotification();
  const router = useRouter();

  async function handleUpdateMoexInfoByUserId(userId: string | undefined) {
    toast
      .promise(
        updateMoexInfoByUserId(userId)
          .then(() => updateContent())
          .then(() => router.refresh()),
        {
          loading: "Updating data...",
          success: "Data successfully updated",
          error: "Failed to update data.",
        }
      )

      .catch((error) => {
        notification.add(error.message, "error", 6000);
      });
  }

  return (
    <Button variant="link" onClick={() => handleUpdateMoexInfoByUserId(userId)}>
      Refresh
    </Button>
  );
}
