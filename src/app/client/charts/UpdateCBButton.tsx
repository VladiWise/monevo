"use client";
import { updateIndexCB } from "@/services/IndexCBService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { IndexCBType } from "@/types";
import { useTransition } from "react";

import { Button } from "@/components/Button";

export function UpdateCBButton({
  children,
  type,
}: {
  children: React.ReactNode;
  type: IndexCBType;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          handleUpdate();
        })
      }
    >
      {isPending ? "Updating…" : children}
    </Button>
  );

  async function handleUpdate() {
    try {
      const result = await updateIndexCB(type);

      if (result?.error) {
        return toast.error(result.error);
      }

      router.refresh();
      toast.success(result.message || "Data successfully updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }
}
