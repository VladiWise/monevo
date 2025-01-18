"use server";

import api from "@/libs/fetch";
import { revalidatePath } from "next/cache";

export async function getList() {
  try {
    const data = await api.get("/bonds");
    return data;
  } catch (error) {
    console.error("Error fetching bonds:", error);
    throw error;
  }
}

export async function getById(id: string) {
  try {
    const data = await api.get(`/bonds/${id}`);
    return data
  } catch (error) {
    console.error(`Error fetching bond with ID ${id}:`, error);
    throw error;
  }
}

export async function create(body: any) {
  try {
    const data = await api.post("/bonds", body);
    return data
  } catch (error) {
    console.error("Error creating bond:", error);
    throw error;
  }
}

export async function update(id: string, body: any) {
  try {
    const data = await api.put(`/bonds/${id}`, body);
    return data
  } catch (error) {
    console.error(`Error updating bond with ID ${id}:`, error);
    throw error;
  }
}

export async function updateAccounts(id: string, body: any) {
  try {
    // Отправляем запрос на добавление или обновление конкретного аккаунта в тикере
    const data = await api.patch(`/bonds/${id}/accounts`, body);
    return data
  } catch (error) {
    console.error(`Error updating accounts for bond with ID ${id}:`, error);
    throw error;
  }
}

export async function remove(id: string) {
  try {
    const data = await api.delete(`/bonds/?id=${id}`);
    revalidatePath("/");
    return data
  } catch (error) {
    console.error(`Error deleting bond with ID ${id}:`, error);
    throw error;
  }
}

