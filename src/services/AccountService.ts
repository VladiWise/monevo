"use server";

import api from "@/libs/fetch";
import { revalidatePath } from "next/cache";

const PATH_POINT = "broker-accounts";
const NAME = "bond";

export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${PATH_POINT}:`, error);
    throw error;
  }
}


// export async function getById(id: string) {
//   try {
//     const data = await api.get(`/${PATH_POINT}?id=${id}`);
//     return data;
//   } catch (error) {
//     console.error(`Error fetching ${NAME} with ID ${id}:`, error);
//     throw error;
//   }
// }

export async function create(body: any, userId: string) {
  try {
    const data = await api.post(`/${PATH_POINT}?userId=${userId}`, body);
    return data;
  } catch (error) {
    console.error(`Error creating ${NAME}:`, error);
    throw error;
  }
}

// export async function update(id: string, body: any) {
//   try {
//     const data = await api.put(`/${PATH_POINT}?id=${id}`, body);
//     return data;
//   } catch (error) {
//     console.error(`Error updating ${NAME} with ID ${id}:`, error);
//     throw error;
//   }
// }


export async function remove(id: string) {
  try {
    const data = await api.delete(`/${PATH_POINT}/?id=${id}`);
    // revalidatePath("/");
    return data;
  } catch (error) {
    console.error(`Error deleting ${NAME} with ID ${id}:`, error);
    throw error;
  }
}
