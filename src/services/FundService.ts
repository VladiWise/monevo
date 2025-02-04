"use server";

import api from "@/libs/fetch";
import { revalidatePath } from "next/cache";

//GOOD!
export async function getList(userId: string | undefined) {
  try {
    const data = await api.get(`/funds?userId=${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching funds:", error);
    throw error;
  }
}

//GOOD!
export async function getById(id: string) {
  try {
    const data = await api.get(`/funds?id=${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching fund with ID ${id}:`, error);
    throw error;
  }
}

export async function create(body: any, userId: string) {
  try {
    const data = await api.post(`/funds?userId=${userId}`, body);
    return data;
  } catch (error) {
    console.error("Error creating fund:", error);
    throw error;
  }
}

export async function update(id: string, body: any) {
  try {
    const data = await api.put(`/funds?id=${id}`, body);
    return data;
  } catch (error) {
    console.error(`Error updating fund with ID ${id}:`, error);
    throw error;
  }
}

export async function updateAccounts(id: string, body: any) {
  try {
    const data = await api.patch(`/funds?id=${id}`, body);
    return data;
  } catch (error) {
    console.error(`Error updating accounts for fund with ID ${id}:`, error);
    throw error;
  }
}

export async function remove(id: string) {
  try {
    const data = await api.delete(`/funds/?id=${id}`);
    revalidatePath("/");
    return data;
  } catch (error) {
    console.error(`Error deleting fund with ID ${id}:`, error);
    throw error;
  }
}
