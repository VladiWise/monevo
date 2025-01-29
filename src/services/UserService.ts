"use server";

import api from "@/libs/fetch";

export async function getByEmail(email: string) {
  try {
    const data = await api.get(`/users/?email=${email}`);
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}