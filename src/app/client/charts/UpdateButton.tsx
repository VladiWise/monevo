"use client";
import { getDBIndexValues, updateIndex } from "@/services/IndexMOEXService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/Button";

export function UpdateButton({
  children,
  SECID,
}: {
  children: React.ReactNode;
  SECID: string;
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
      const result = await updateIndex(SECID);

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
