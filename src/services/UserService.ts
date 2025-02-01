"use server";

import api from "@/libs/fetch";

export async function getUserByEmail(email: string | undefined | null) {
  try {
    const data = await api.get(`/users/?email=${email}`);
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}


export async function getUserById(id: string | undefined) {

  try {
    const data = await api.get(`/users/?id=${id}`)
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}