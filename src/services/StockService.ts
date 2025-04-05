"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/utils/getErrorMessage";
const PATH_POINT = "stocks";
const NAME = "stock";

export async function getList(userId: string | undefined, brokerId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}&brokerId=${brokerId}`, { next: { tags: ["assets"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function create(body: any, userId: string | undefined, brokerId: string | undefined) {
  try {

    const data = await api.post(`/${PATH_POINT}?userId=${userId}&brokerId=${brokerId}`, body);
    revalidateTag("home");
    revalidateTag("assets");
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function remove(id: string) {
  try {

    const data = await api.delete(`/${PATH_POINT}/?id=${id}`);
    revalidateTag("home");
    revalidateTag("assets");
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
