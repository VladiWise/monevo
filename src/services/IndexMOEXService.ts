"use server";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { revalidateTag } from "next/cache";
import api from "@/libs/fetch";
import { calculateAnnualizedReturn } from "@/utils/mathUtils";

export async function getAnnualizedIndexByYears(SECID: string, years?: number) {
  try {
    const data = await api.get(`/indexes?SECID=${SECID}`, { next: { tags: ["charts"] }, cache: "no-cache" });
    return calculateAnnualizedReturn(data, years);
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function updateIndex(SECID: string) {
  try {
    const data = await api.post(`/indexes?SECID=${SECID}`, { next: { tags: ["charts"] }, cache: "no-cache" });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}

export async function getDBIndexValues(SECID: string) {
  try {
    const data = await api.get(`/indexes?SECID=${SECID}`, { next: { tags: ["charts"] }, cache: "no-cache" });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


export async function getIndexValues(SECID: string, start: number) {
  try {
    const response = await fetch(
      `https://iss.moex.com/iss/history/engines/stock/markets/index/securities/${SECID}.json?start=${start}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error;
    }

    const columns = data.history.columns

    return {
      data: data.history.data.map((oneLine: any[]) => {

        let index = 0;
        let obj = {}

        for (const col of columns) {
          obj = {
            ...obj,
            [col]: oneLine[index]
          }
          index++
        }
        return obj
      }),
      cursor: { ...getProperFormat(data, "history.cursor") }

    }

  } catch (error) {
    throw new Error("Invalid data returned from API")
  }
}

function getProperFormat(data: any, field: string, index: number = 0) {

  const hc = data[field];

  const row = hc.data[index];
  const result = hc.columns.reduce((acc: any, colName: string, idx: number) => {
    acc[colName] = row[idx];
    return acc;
  }, {});

  return result

}