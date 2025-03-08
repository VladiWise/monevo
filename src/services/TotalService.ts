"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";

const PATH_POINT = "home/total";
const NAME = "total";

export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, {next: {tags: ["total"]}});
    return data;
  } catch (error) {
    console.error(`Error fetching ${PATH_POINT}:`, error);
    throw error;
  }
}


export async function getByUserId(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, {next: {tags: ["total"]}});
    return data;
  } catch (error) {
    console.error(`Error fetching ${NAME} with ID ${userId}:`, error);
    throw error;
  }
}

export async function create(body: any, userId: string | undefined) {
  revalidateTag("total");

  try {
    const data = await api.post(`/${PATH_POINT}?userId=${userId}`, body);

    return data;
  } catch (error) {
    console.error(`Error creating ${NAME}:`, error);
    throw error;
  }
}
