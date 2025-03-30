"use server";

import { auth } from "@/auth";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export async function getCurrentUser(): Promise<User> {
  const session = await auth();


  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return session.user as User;
}