"use server";

import { auth, signOut } from "@/auth";


export async function getCurrentUser() {
  const session = await auth();

  if (!session?.user) {
    await signOut({ redirectTo: "/" });
    return null;
  }


  return session.user;
}