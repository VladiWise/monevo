"use server";

import api from "@/libs/fetch";

    export async function getList() {
      const { data } = await api.get("/bonds");
      return data;
    }

    export async function getById(id: string) {
      try {
        const response = await api.get(`/bonds/${id}`);
        return response.data ? response.data : {};
      } catch (error) {
        console.error(`Error fetching bond with ID ${id}:`, error);
        throw error;
      }
    }

    export async function create(body: any) {
      try {
        const response = await api.post("/bonds", body);
        return response.data;
      } catch (error) {
        console.error("Error creating bond:", error);
        throw error;
      }
    }

    export async function update(id: string, body: any) {
      try {
        const response = await api.put(`/bonds/${id}`, body);
        return response.data;
      } catch (error) {
        console.error(`Error updating bond with ID ${id}:`, error);
        throw error;
      }
    }

    export async function updateAccounts(id: string, body: any) {
      try {
        // Отправляем запрос на добавление или обновление конкретного аккаунта в тикере
        const response = await api.patch(`/bonds/${id}/accounts`, body);
        return response.data;
      } catch (error) {
        console.error(`Error updating accounts for bond with ID ${id}:`, error);
        throw error;
      }
    }

    export async function remove(id: string) {
      try {
        const response = await api.delete(`/bonds/?id=${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting bond with ID ${id}:`, error);
        throw error;
      }
    }

