"use server";

import api from "@/libs/fetch";
import { revalidatePath } from "next/cache";

const PATH_POINT = "home";


type Asset = {
  bonds: number;
  stocks: number;
};

export async function getAssetsInfoByUserId(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`);
    return data as Asset;
  } catch (error) {
    console.error(`Error fetching main client info with ID ${userId}:`, error);
    throw error;
  }
}


export async function updateMoexInfoByUserId(userId: string | undefined) {
  try {
    const data = await api.put(`/${PATH_POINT}?userId=${userId}`);
    revalidatePath("/client/home");
    return data;
  } catch (error) {
    console.error(`Error fetching main client info with ID ${userId}:`, error);
    throw error;
  }
}

