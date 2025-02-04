"use server";

import api from "@/libs/fetch";

export async function getList() {
  const data = await api.get("/bankAccounts");
  return data;
}

export async function getById(id: string) {
  const data = await api.get(`/bankAccounts/${id}`);
  return data;
}

export async function create(body: any) {
  const data = await api.post("/bankAccounts", body);
  return data;
}

export async function update(id: string, body: any) {
  const data = await api.put(`/bankAccounts/${id}`, body);
  return data;
}

export async function remove(id: string) {
  const data = await api.delete(`/bankAccounts/?id=${id}`);
  return data;
}


