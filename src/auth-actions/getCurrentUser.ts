"use server";

import { auth } from "@/auth";


export async function getCurrentUser() {
  const session = await auth();


  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return session?.user;
}