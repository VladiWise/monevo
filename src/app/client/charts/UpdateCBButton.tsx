"use client";
import { updateIndexCB } from "@/services/IndexCBService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { IndexCBType } from "@/types";
import { useTransition } from "react";
import { RxUpdate } from "react-icons/rx";
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
      className="absolute top-2 right-2"
      variant="prim"
      onClick={() =>
        startTransition(() => {
          handleUpdate();
        })
      }
    >
      {isPending ? (
        <RxUpdate className="text-black dark:text-white animate-spin" />
      ) : (
        <RxUpdate className="text-black dark:text-white" />
      )}
    </Button>
  );

  async function handleUpdate() {
    try {
      const result = await updateIndexCB(type);

      if ("error" in result) {
        return toast.error(result.error);
      }

      router.refresh();
      toast.success(result.message || "Data successfully updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }
}
