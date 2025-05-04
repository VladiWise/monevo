"use client";

import React from "react";
import { useConfirmStore } from "@/store/useConfirmStore";
import { Button } from "./Button";
import { MainContainer } from "./MainContainer";

/**
 * Global confirm dialog component.
 * Renders when isOpen = true, and calls store.confirm / store.cancel.
 */
export function ConfirmDialog() {
  // Select individual pieces of state to avoid unnecessary re-renders
  const isOpen = useConfirmStore((state) => state.isOpen);
  const message = useConfirmStore((state) => state.message);
  const confirm = useConfirmStore((state) => state.confirm);
  const cancel = useConfirmStore((state) => state.cancel);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 bg-black bg-opacity-40 z-50 backdrop-blur-sm">
      <MainContainer className="p-6 shadow-lg max-w-sm text-center">
        <p className="mb-4 text-lg font-medium">{message}</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={confirm} className="px-4 py-2" variant="primary">
            Yeah
          </Button>
          <Button onClick={cancel} className="px-4 py-2" variant="simple">
            Nope
          </Button>
        </div>
      </MainContainer>
    </div>
  );
}
