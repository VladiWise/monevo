// src/stores/confirmStore.ts
import { create } from 'zustand';

/**
 * A store that manages a custom confirm dialog.
 * Usage:
 *   const confirm = useConfirmStore(state => state.open);
 *   if (await confirm("Are you sure?")) { ... }
 */
interface ConfirmStore {
  isOpen: boolean;
  message: string;
  /**
   * Show the dialog with `msg` and return a Promise that resolves to
   * `true` if confirmed, `false` if cancelled.
   */
  open: (msg: string) => Promise<boolean>;
  /** Called by the dialog UI when user clicks "Yes" */
  confirm: () => void;
  /** Called by the dialog UI when user clicks "No" or closes */
  cancel: () => void;
}

export const useConfirmStore = create<ConfirmStore>((set) => {
  // This variable lives in closure, not in React state,
  // and will hold the resolver for the current Promise.
  let pendingResolve: (result: boolean) => void;

  return {
    isOpen: false,
    message: '',

    open: (msg: string) => {
      // show dialog
      set({ isOpen: true, message: msg });
      // return a new Promise and capture its resolver
      return new Promise<boolean>((resolve) => {
        pendingResolve = resolve;
      });
    },

    confirm: () => {
      // hide dialog
      set({ isOpen: false, message: '' });
      // resolve the Promise from `open` with true
      pendingResolve(true);
    },

    cancel: () => {
      // hide dialog
      set({ isOpen: false, message: '' });
      // resolve the Promise from `open` with false
      pendingResolve(false);
    },
  };
});
