"use server";

import api from "@/libs/fetch";

import { getErrorMessage } from "@/utils/getErrorMessage";

const PATH_POINT = "bank-accounts";
const NAME = "bank account";

export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["accounts"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
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

    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}




export async function remove(id: string) {
  try {

    await api.delete(`/${PATH_POINT}/?id=${id}`);


  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
