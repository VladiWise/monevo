"use server";

import api from "@/libs/fetch";
import { revalidateTag } from "next/cache";

const PATH_POINT = "home";


type Asset = {
  bonds: number;
  stocks: number;
  cashBroker: number;
};

export async function getAssetsInfoByUserId(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}?userId=${userId}`, { next: { tags: ["home"] } });
    return data as Asset;
  } catch (error) {
    console.error(`Error fetching main client info with ID ${userId}:`, error);
    throw error;
  }
}

export async function getCurrenciesInfoByUserId(userId: string | undefined) {
  try {
    const data = await api.get(`/${PATH_POINT}/currencies?userId=${userId}`, { next: { tags: ["home"] } });
    return data 
  } catch (error) {
    console.error(`Error fetching main client info with ID ${userId}:`, error);
    throw error;
  }
}


export async function updateMoexInfoByUserId(userId: string | undefined) {
  revalidateTag("assets");
  revalidateTag("cash");
  revalidateTag("home");

  try {
    const data = await api.put(`/${PATH_POINT}?userId=${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching main client info with ID ${userId}:`, error);
    throw error;
  }
}

