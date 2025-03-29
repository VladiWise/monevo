"use client";

import { useNotification } from "@/store/useNotification";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
type DelButtonProps = {
  id: string;
  removeItem: (id: string) => Promise<void>;
};

export function DeleteButton({ id, removeItem }: DelButtonProps) {
  const notification = useNotification();
  const router = useRouter();
  async function handleRemove(id: string) {
    const removeAnswer = confirm(`You really wanna delete this item?`);

    if (!removeAnswer) return;

    toast
      .promise(
        removeItem(id).then(() => router.refresh()),
        {
          loading: "Deleting data...",
          success: "Data successfully deleted!",
          error: "Failed to delete data.",
        }
      )

      .catch((err) => {
        notification.add(err.message, "error", 6000);
      });
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
