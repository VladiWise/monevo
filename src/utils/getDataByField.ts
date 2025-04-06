"use server";

import { type MoexJson } from "@/utils/moexInfo";
import { MOEX_INFO_NAME } from "@/utils/moexInfo";
import { type MoexFieldRequired } from "@/utils/moexInfo";
export async function getDataByField(moexJson: MoexJson, fieldKey: keyof typeof MOEX_INFO_NAME) {
  try {
    const field = MOEX_INFO_NAME[fieldKey];
    if (!field.id || !field.name) {
      throw new Error(`Field ${fieldKey} is missing id or name`);
    }


    const index = moexJson[field.id]?.columns?.indexOf(field.name);


    if (index === -1 || !index) {
      throw new Error(`Field ${field.name} not found in columns`);
    }

    if (fieldKey === "price") {
      if (moexJson[field.id]?.data[0][index]) {
        return moexJson[field.id].data[0][index]
      } else {
        const field = MOEX_INFO_NAME.prevPrice as MoexFieldRequired;
        const index = moexJson[field.id]?.columns?.indexOf(field.name);
        return moexJson[field.id].data[0][index]
      }
    }
    return moexJson[field.id].data[0][index];
  } catch (error) {
    console.error(error);
    throw error
  }
}