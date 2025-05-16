"use server";
import { getErrorMessage } from "@/utils/getErrorMessage";
import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";
import { type Data } from "@/app/client/home/page";
const PATH_POINT = "home";



export async function getAssetTypesByUserId(userId: string) {
  try {
    const data = await api.get(`/${PATH_POINT}/asset-type?userId=${userId}`, { next: { tags: ["home"] } });
    return data as number;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function getAssetsInfoByUserId(userId: string) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["home"] } });
    return data as Data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getCurrenciesInfoByUserId(userId: string) {
  try {
    const data = await api.get(`/${PATH_POINT}/currencies?userId=${userId}`, { next: { tags: ["home"] } });
    return data
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function updateMoexInfoByUserId(userId: string) {
  try {
    await api.put(`/${PATH_POINT}?userId=${userId}`);
    revalidateTag("assets");
    revalidateTag("cash");
    revalidateTag("home");

    return { message: "Data successfully updated" };

  } catch (error) {

    return { error: getErrorMessage(error) };
  }
}

