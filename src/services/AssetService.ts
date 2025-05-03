"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/utils/getErrorMessage";

export type PathName = "funds-b" | "funds-s" | "bonds"
  | "stocks" | "currency" | "deposits"
  | "cash-free" | "loans"


  export async function getOne(pathName: PathName, assetId: string | undefined) {
    try {
      const data = await api.get(`/${pathName}?assetId=${assetId}`, { next: { tags: ["assets"] } });
      return data;
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  }



export async function getList(pathName: PathName, brokerId: string | undefined) {
  try {
    const data = await api.get(`/${pathName}?brokerId=${brokerId}`, { next: { tags: ["assets"] } });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function create(pathName: PathName, body: any, userId: string | undefined, brokerId: string | undefined) {
  try {

    const data = await api.post(`/${pathName}?userId=${userId}&brokerId=${brokerId}`, body);
    revalidateTag("home");
    revalidateTag("assets");
    revalidateTag("cash");
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function remove(pathName: PathName, id: string) {
  try {

    const data = await api.delete(`/${pathName}/?id=${id}`);
    revalidateTag("home");
    revalidateTag("assets");
    revalidateTag("cash");
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
