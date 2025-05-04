// hooks/useConfirm.ts
import { useConfirmStore } from "@/store/useConfirmStore";

export function useConfirm() {
  return useConfirmStore((store) => store.open);
}
