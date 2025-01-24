"use client";

import { Button } from "@/components/Button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link" className="w-full font-normal">
      <Link href={href}>{label}</Link>
    </Button>
  );
}
