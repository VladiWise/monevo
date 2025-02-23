"use client";

import { useNotification } from "@/store/useNotification";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

type DelButtonProps = {
  id: string;
  removeItem: (id: string) => Promise<void>;
};

export function DeleteButton({ id, removeItem }: DelButtonProps) {
  const notification = useNotification();
  const router = useRouter();
  async function handleRemove(id: string) {
    const removeAnswer = confirm(`Remove ${id}?`);

    if (!removeAnswer) return;

    notification
      .promise(removeItem(id), {
        loading: "Deleting data...",
        success: "Data successfully deleted!",
        error: "Failed to delete data.",
      })
      .then(() => router.refresh())
      .catch(() => {});
  }

  return (
    <>
      <button
        onClick={() => handleRemove(id)}
        className="text-primary hover:text-primary/80"
      >
        <HiOutlineTrash size={24} />
      </button>
    </>
  );
}
