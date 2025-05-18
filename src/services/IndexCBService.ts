"use server";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { revalidateTag } from "next/cache";
import api from "@/libs/fetch";
import { type API_IndexCB, type IndexCBType, type DB_IndexCBDeposit } from "@/types";


export async function updateIndexCB(type: IndexCBType) {
  try {
    const data = await api.post(`/indexes-cb?type=${type}`, { next: { tags: ["charts"] }, cache: "no-cache" });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}



export async function getDBIndexCB<T>(type: IndexCBType): Promise<T[] | { error: string }> {
  try {
    console.log("type::::::", type);
    const data = await api.get(`/indexes-cb?type=${type}`, { next: { tags: ["charts"] }, cache: "no-cache" }) as T[];
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


// EXTERNAL API https://www.cbr.ru/dataservice/data

export async function getIndexCBCreadit() {
  try {

    const response = await fetch(
      `https://www.cbr.ru/dataservice/data?y1=2014&y2=${new Date().getFullYear()}&publicationId=14&datasetId=27&measureId=2`
    );

    const { RawData: data } = await response.json();

    if (!response.ok) {
      throw new Error
    }

    const result = pivotByRowId(data, [
      { colId: 5, prop: "value_91d_180d" },
      { colId: 6, prop: "value_181d_1y" },
      { colId: 9, prop: "value_1y_3y" },
      { colId: 10, prop: "value_over_3y" },

    ])

    return result

  } catch (error) {
    throw new Error("Invalid data returned from API")
  }
}

export async function getIndexCBDeposit() {
  try {

    const response = await fetch(
      `https://www.cbr.ru/dataservice/data?y1=2014&y2=${new Date().getFullYear()}&publicationId=18&datasetId=37&measureId=2`
    );

    const { RawData: data } = await response.json();

    if (!response.ok) {
      throw new Error
    }

    const result = pivotByRowId(data, [
      { colId: 5, prop: "value_91d_180d" },
      { colId: 6, prop: "value_181d_1y" },
      { colId: 9, prop: "value_1y_3y" },
      { colId: 10, prop: "value_over_3y" },
    ])

    return result

  } catch (error) {
    throw new Error("Invalid data returned from API")
  }
}

export async function getIndexCBLoanVolume() {
  try {

    const response = await fetch(
      `https://www.cbr.ru/dataservice/data?y1=2019&y2=${new Date().getFullYear()}&publicationId=20&datasetId=42&measureId=22`
    );


    const { RawData: data } = await response.json();

    if (!response.ok) {
      throw new Error
    }

    const result = pivotByRowId(data, [
      { colId: 35, prop: "value" },
    ])

    return result

  } catch (error) {
    throw new Error("Invalid data returned from API")
  }
}


function pivotByRowId(
  data: API_IndexCB[],
  colMappings: { colId: number; prop: string }[]
) {
  // создаём быстрый lookup colId → prop
  const lookup = new Map<number, string>(
    colMappings.map(({ colId, prop }) => [colId, prop])
  );

  const map = new Map<number, any>();

  for (const item of data) {
    const { rowId, colId, obs_val: value, date } = item;

    // инициализируем группу при первом вхождении
    if (!map.has(rowId)) {
      map.set(rowId, { date: date + "Z" });
    }
    const group = map.get(rowId)!;

    // ищем в lookup имя поля
    const prop = lookup.get(colId);
    if (prop) {
      group[prop] = value;
    }
  }

  return Array.from(map.values());
}
