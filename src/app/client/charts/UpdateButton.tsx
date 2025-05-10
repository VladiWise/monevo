"use client";
import { getDBIndexValues, updateIndex } from "@/services/IndexMOEXService";

import { Button } from "@/components/Button";

export function UpdateButton({
  children,
  SECID,
}: {
  children: React.ReactNode;
  SECID: string;
}) {
  return (
    <Button
      onClick={() => {
        updateIndex(SECID);
      }}
    >
      {children}
    </Button>
  );
}
