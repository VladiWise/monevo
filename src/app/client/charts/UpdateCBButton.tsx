"use client";
import { updateIndexCB } from "@/services/IndexCBService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { IndexCBType } from "@/types";
import { useTransition } from "react";
import { RxUpdate } from "react-icons/rx";

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
    <div
      className="absolute top-2 right-2 p-2"
      onClick={() =>
        startTransition(() => {
          handleUpdate();
        })
      }
    >
      {isPending ? (
        <RxUpdate className="text-black dark:text-white animate-spin text-2xl" />
      ) : (
        <RxUpdate className="text-black dark:text-white text-2xl" />
      )}
    </div>
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
