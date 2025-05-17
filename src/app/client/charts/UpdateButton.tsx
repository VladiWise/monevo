"use client";
import {  updateIndex } from "@/services/IndexMOEXService";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RxUpdate } from "react-icons/rx";


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
    <div
      className="absolute top-2 right-2 p-2"
      onClick={() =>
        startTransition(() => {
          handleUpdate();
        })
      }
    >
      {isPending ? (
        <RxUpdate  className="text-black dark:text-white animate-spin text-2xl" />
      ) : (
        <RxUpdate  className="text-black dark:text-white text-2xl" />
      )}
    </div>
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
