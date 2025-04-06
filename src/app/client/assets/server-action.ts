"use server";

import { getDataByField } from "@/utils/getDataByField";
import { fetchCurrencyValue } from "@/services/ExternalCurrencyService";
import { type MoexJson } from "@/utils/moexInfo";
import { CURRENCY } from "@/utils/constants";
export const getFundEtfServerBody = async (data: any, moexJson: MoexJson) => {
  return {
    accountId: data.accountId,
    ticker: data.ticker,
    amount: data.amount,
    name: await getDataByField(moexJson, "shortName"),
    currency: await getDataByField(moexJson, "currency"),
    price: await getDataByField(moexJson, "price"),
  };
};

export const getBondServerBody = async (data: any, moexJson: MoexJson) => {

  return {
    accountId: data.accountId,
    ticker: data.ticker,
    amount: data.amount,
    name: await getDataByField(moexJson, "shortName"),
    currency: await getDataByField(moexJson, "currency"),
    price:
      ((await getDataByField(moexJson, "price")) *
        (await getDataByField(moexJson, "nominal")) *
        (await fetchCurrencyValue(
          await getDataByField(moexJson, "currency")
        ))) /
      100 +
      (await getDataByField(moexJson, "coupon")),
    bondYield: await getDataByField(moexJson, "bondYield"),
    matDate: await getDataByField(moexJson, "matDate"),
  };
};

export const getCurrencyServerBody = async (data: any) => {

  return {
    ticker: data.currency,
    amount: +data.amount,
    name: CURRENCY[data.currency as keyof typeof CURRENCY],
    price: await fetchCurrencyValue(data.currency),
  };
};