"use server";

import { auth } from "@/auth";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export async function getCurrentUser():Promise<User | undefined> {
  const session = await auth();

  return session?.user as User;
}