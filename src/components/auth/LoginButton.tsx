"use client";

import { useRouter } from "next/navigation";


interface LoginButtonProps {
  children: React.ReactNode;
  mode?: string;
}

export function LoginButton ({ children, mode = "redirect" } : LoginButtonProps) {
    const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <h1>MODE = `modal`</h1>;
  }
  return <span onClick={onClick}>{children}</span>;
};


