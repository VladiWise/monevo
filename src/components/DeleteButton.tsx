"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/getErrorMessage";
import toast from "react-hot-toast";
type DelButtonProps = {
  id: string;
  removeItem: (id: string) => Promise<any>;
  updatePageContent?: () => Promise<void>;
};

export function DeleteButton({
  id,
  removeItem,
  updatePageContent,
}: DelButtonProps) {
  const router = useRouter();
  async function handleRemove(id: string) {
    const removeAnswer = confirm(`You really wanna delete this item?`);

    if (!removeAnswer) return;

    toast
      .promise(
        removeItem(id)
          .then((data) => {
            if (data?.error) {
              throw new Error(data.error);
            }
          })
          .then(() => updatePageContent?.()),
        {
          loading: "Deleting data...",
          success: "Data successfully deleted!",
        }
      )
      .catch((error) => {
        toast.error(getErrorMessage(error, "Failed to delete data."));
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
