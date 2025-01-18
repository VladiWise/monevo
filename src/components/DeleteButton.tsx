"use client";

import { useNotification } from "@/store/useNotification";
import { HiOutlineTrash } from "react-icons/hi";

type DelButtonProps = {
  id: string;
  removeItem: (id: string) => Promise<void>;
};

export function DeleteButton({ id, removeItem }: DelButtonProps) {
  const notification = useNotification();

  async function handleRemove(id: string) {
    let removeAnswer = confirm(`Remove ${id}?`);

    if (!removeAnswer) return;

    notification
      .promise(removeItem(id), {
        loading: "Deleting data...",
        success: "Data successfully deleted!",
        error: "Failed to delete data.",
      })
      .catch(() => {});
  }

  return (
    <>
      <button
        onClick={() => handleRemove(id)}
        className="text-red-600 hover:text-red-700/80"
      >
        <HiOutlineTrash size={24} />
      </button>
    </>
  );
}
