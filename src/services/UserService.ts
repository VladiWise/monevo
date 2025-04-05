"use server";

import api from "@/libs/fetch";
import { getErrorMessage } from "@/utils/getErrorMessage";
export async function getUserByEmail(email: string | undefined | null) {
  try {
    const data = await api.get(`/users/?email=${email}`);
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function getUserById(id: string | undefined) {

  try {
    const data = await api.get(`/users/?id=${id}`)
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}