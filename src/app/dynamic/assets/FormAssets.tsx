"use client";

import toast from "react-hot-toast";

import { fetchStockETFInfo, fetchBondInfo } from "@/services/MoexService";

import { Input, Select } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { CURRENCY } from "@/utils/constants";

import { getErrorMessage } from "@/utils/getErrorMessage";

import * as assetService from "@/services/AssetService";

type AssType = "stock" | "bond" | "ETFstock" | "ETFbond" | "currency";

export function FormAssets({
  userId,
  brokerId,
  getFundEtfServerBody,
  getBondServerBody,
  getCurrencyServerBody,
}: {
  userId: string | undefined;
  brokerId: string;
  getFundEtfServerBody: (data: any, moexJson: any) => Promise<any>;
  getBondServerBody: (data: any, moexJson: any) => Promise<any>;
  getCurrencyServerBody: (data: any) => Promise<any>;
}) {
  const router = useRouter();
  const form = useForm({});

  const type = form.watch("type") as AssType;

  async function handleOnSubmit(data: any) {
    try {
      form.reset();

      const formattedData = {
        accountId: data.accountId,
        ticker: data.ticker.trim().toUpperCase(),
        amount: +data.amount,
      };

      switch (type) {
        case "stock":
          const moexStockJson = await fetchStockETFInfo(formattedData.ticker);
          const stockBody = await getFundEtfServerBody(
            formattedData,
            moexStockJson
          );
          await assetService.create("stocks", stockBody, userId, data.brokerId);
          break;

        case "bond":
          const moexBondJson = await fetchBondInfo(formattedData.ticker);
          const bondBody = await getBondServerBody(formattedData, moexBondJson);
          await assetService.create("bonds", bondBody, userId, data.brokerId);
          break;

        case "ETFstock":
          const moexETFStockJson = await fetchStockETFInfo(
            formattedData.ticker
          );

          const ETFStockBody = await getFundEtfServerBody(
            formattedData,
            moexETFStockJson
          );
          await assetService.create(
            "funds-s",
            ETFStockBody,
            userId,
            data.brokerId
          );
          break;

        case "ETFbond":
          const moexETFBondJson = await fetchStockETFInfo(formattedData.ticker);
          const ETFBondBody = await getFundEtfServerBody(
            formattedData,
            moexETFBondJson
          );
          await assetService.create(
            "funds-b",
            ETFBondBody,
            userId,
            data.brokerId
          );
          break;

        case "currency":
          const currencyBody = await getCurrencyServerBody(data);

          await assetService.create(
            "currency",
            currencyBody,
            userId,
            data.brokerId
          );

          break;

        default:
          break;
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormProvider
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <Select name="type" required>
        <option value="">Select option</option>

        <option value="stock">Stock</option>
        <option value="bond">Bond</option>
        <option value="ETFstock">ETF stock</option>
        <option value="ETFbond">ETF bond</option>
        <option value="currency">Currency</option>
      </Select>

      {type === "currency" ? (
        <Select name="currency" required>
          {Object.keys(CURRENCY).map((currencyCode) => (
            <option key={currencyCode} value={currencyCode}>
              {CURRENCY[currencyCode as keyof typeof CURRENCY]}
            </option>
          ))}
        </Select>
      ) : (
        <Input name="ticker" type="text" placeholder="Ticker" required />
      )}

      <Input name="amount" type="number" placeholder="Amount" required />

      <Button type="submit">Add</Button>
    </FormProvider>
  );

  async function onSubmit(data: any) {
    toast
      .promise(
        handleOnSubmit({ ...data, brokerId }).then(() => router.refresh()),
        {
          loading: "Creating...",
          success: "Successfully created!",
        }
      )
      .catch((error) => {
        toast.error(getErrorMessage(error, "Failed to create."));
      });
  }
}
