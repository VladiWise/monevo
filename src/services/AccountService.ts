"use server";

import api from "@/libs/fetch";

export async function getList() {
  const data = await api.get("/accounts");
  return data;
}

export async function getById(id: string) {
  const data = await api.get(`/accounts/${id}`);
  return data;
}

export async function create(body: any) {
  const data = await api.post("/accounts", body);
  return data;
}

export async function update(id: string, body: any) {
  const data = await api.put(`/accounts/${id}`, body);
  return data;
}

export async function remove(id: string) {
  const data = await api.delete(`/accounts/?id=${id}`);
  return data;
}


