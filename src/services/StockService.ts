"use server";

import api from "@/libs/fetch";
import { revalidatePath } from "next/cache";

const PATH_POINT = "stocks";
const NAME = "stock";

export async function getList(userId: string | undefined, brokerId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}&brokerId=${brokerId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${PATH_POINT}:`, error);
    throw error;
  }
}

export async function create(body: any, userId: string | undefined, brokerId: string | undefined) {
  try {
    revalidatePath("/client/home")
    revalidatePath("/client/dashboard")
    const data = await api.post(`/${PATH_POINT}?userId=${userId}&brokerId=${brokerId}`, body);
    return data;
  } catch (error) {
    console.error(`Error creating ${NAME}:`, error);
    throw error;
  }
}

export async function remove(id: string) {
  try {
    revalidatePath("/client/home")
    revalidatePath("/client/dashboard")
    const data = await api.delete(`/${PATH_POINT}/?id=${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting ${NAME} with ID ${id}:`, error);
    throw error;
  }
}
