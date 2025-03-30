"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";


const PATH_POINT = "bank-accounts";
const NAME = "bank account";

export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["accounts"] } });
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
//      throw error;
//   }
// }

export async function create(body: any, userId: string) {
  try {

    const data = await api.post(`/${PATH_POINT}?userId=${userId}`, body);
    revalidateTag("accounts");
    return data;
  } catch (error) {
    console.error(`Error creating ${NAME}:`, error);
    throw error;
  }
}

// export async function update(id: string, body: any) {
//   try {
// revalidatePath("/client/home")
// revalidatePath("/client/dashboard")
//     const data = await api.put(`/${PATH_POINT}?id=${id}`, body);
//     return data;
//   } catch (error) {
//     console.error(`Error updating ${NAME} with ID ${id}:`, error);
//      throw error;
//   }
// }


export async function remove(id: string) {
  try {

    const data = await api.delete(`/${PATH_POINT}/?id=${id}`);
    revalidateTag("accounts");
    return data;
  } catch (error) {
    console.error(`Error deleting ${NAME} with ID ${id}:`, error);
    throw error;
  }
}
