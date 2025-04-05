"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/utils/getErrorMessage";
const PATH_POINT = "home/total";
const NAME = "total";

export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["total"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function getByUserId(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["total"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function create(body: any, userId: string | undefined) {

  try {
    const data = await api.post(`/${PATH_POINT}?userId=${userId}`, body);

    revalidateTag("total");
    revalidateTag("home");

    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
