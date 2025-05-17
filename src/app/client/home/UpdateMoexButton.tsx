"use client";
import { useState } from "react";
import { Button } from "@/components/Button";
import { updateMoexInfoByUserId } from "@/services/HomeService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
import { useTransition } from "react";

import { useRouter } from "next/navigation";

export function UpdateMoexButton({ userId }: { userId: string | undefined }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleUpdate(userId: string): Promise<void> {
    try {
      const result = await updateMoexInfoByUserId(userId);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      router.refresh();

      toast.success("Data successfully updated");

    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Button
      variant="link"
      disabled={isPending}
      onClick={() => startTransition(() => handleUpdate(userId!))}
    >
      {isPending ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
