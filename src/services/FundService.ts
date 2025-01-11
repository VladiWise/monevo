"use server";

import api from "@/libs/fetch";
import { revalidatePath } from "next/cache";

export async function getList() {
  try {
    const data = await api.get("/funds");
    return data;
  } catch (error) {
    console.error("Error fetching funds:", error);
    throw error;
  }
}

export async function functiongetById(id: string) {
  try {
    const data = await api.get(`/funds/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching fund with ID ${id}:`, error);
    throw error;
  }
}

export async function create(body: any) {
  try {
    const data = await api.post("/funds", body);
    return data;
  } catch (error) {
    console.error("Error creating fund:", error);
    throw error;
  }
}

export async function update(id: string, body: any) {
  try {
    const data = await api.put(`/funds/${id}`, body);
    return data;
  } catch (error) {
    console.error(`Error updating fund with ID ${id}:`, error);
    throw error;
  }
}

export async function updateAccounts(id: string, body: any) {
  try {
    const data = await api.patch(`/funds/${id}/accounts`, body);
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
