"use server";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { revalidateTag } from "next/cache";
import api from "@/libs/fetch";
import { type API_IndexCBDeposit, type DB_IndexCBDeposit, type IndexCBType } from "@/types";


export async function updateIndexCB(type: IndexCBType) {
  try {
    const data = await api.post(`/indexes-cb?type=${type}`, { next: { tags: ["charts"] }, cache: "no-cache" });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}



export async function getDBIndexCB(type: IndexCBType) {
  try {
    const data = await api.get(`/indexes-cb?type=${type}`, { next: { tags: ["charts"] }, cache: "no-cache" });
    return data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}




export async function getIndexCBDeposit() {
  try {

    const response = await fetch(
      `https://www.cbr.ru/dataservice/data?y1=2014&y2=${new Date().getFullYear()}&publicationId=18&datasetId=37&measureId=2`
    );

    const { RawData: data } = await response.json();

    if (!data) {
      return { error: getErrorMessage("Invalid data returned from Moex") };
    }

    const result = pivotByRowId(data)

    return result

  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}


function pivotByRowId(data: API_IndexCBDeposit[]) {

  const map = new Map();

  data.forEach(item => {
    const { rowId, colId, obs_val: value, date } = item;

    // заводим группу, если ещё нет
    if (!map.has(rowId)) {
      map.set(rowId, { date: date + "Z" });
    }
    const group = map.get(rowId);

    // маппинг colId → имя свойства
    switch (colId) {
      case 5:
        group.value_91d_180d = value;
        break;
      case 6:
        group.value_181d_1y = value;
        break;
      case 9:
        group.value_1y_3y = value;
        break;
    }
  });

  console.log("map.values()", map.values());

  return Array.from(map.values());
}
