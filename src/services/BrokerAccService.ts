"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/utils/getErrorMessage";

const PATH_POINT = "broker-accounts";
const NAME = "broker account";

export async function getTotal(brokerId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}/total?brokerId=${brokerId}`, { next: { tags: ["accounts"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["accounts"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getOneById(id: string) {
  try {
    const data = await api.get(`/${PATH_POINT}?id=${id}`, { next: { tags: ["accounts"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function create(body: any, userId: string) {
  try {
    // revalidatePath("/client/dashboard")
    const data = await api.post(`/${PATH_POINT}?userId=${userId}`, body);
    revalidateTag("accounts");
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}



export async function remove(id: string) {
  try {
    await api.delete(`/${PATH_POINT}/?id=${id}`);
    revalidateTag("accounts");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
