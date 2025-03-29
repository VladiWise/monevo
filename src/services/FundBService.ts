"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";

const PATH_POINT = "funds-b";
const NAME = "fund";

export async function getList(userId: string | undefined, brokerId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}&brokerId=${brokerId}`, {next: {tags: ["assets"]}});
    return data;
  } catch (error) {
    console.error(`Error fetching ${PATH_POINT}:`, error);
    throw error;
  }
}

export async function create(body: any, userId: string | undefined, brokerId: string | undefined) {
  try {
    
    const data = await api.post(`/${PATH_POINT}?userId=${userId}&brokerId=${brokerId}`, body);
    revalidateTag("assets");
    revalidateTag("home");
    return data;
  } catch (error) {
    console.error(`Error creating ${NAME}:`, error);
    throw error;
  }
}

export async function remove(id: string) {
  try {
    
    const data = await api.delete(`/${PATH_POINT}/?id=${id}`);
    revalidateTag("assets");
    revalidateTag("home");
    return data;
  } catch (error) {
    console.error(`Error deleting ${NAME} with ID ${id}:`, error);
    throw error;
  }
}
