"use client";
import toast from "react-hot-toast";
import { Input, Select } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CURRENCY } from "@/utils/constants";
import * as depositService from "@/services/DepositService";
import * as cashFreeService from "@/services/CashFreeService";
import * as loanService from "@/services/LoanService";
type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

type AssType = "deposit" | "cashFree";

export function FormAssets({
  userId,
  accounts,
  getCurrencyServerBody,
}: {
  userId: string | undefined;
  accounts: Account[];
  getCurrencyServerBody: (data: any) => Promise<any>;
}) {
  const router = useRouter();
  const form = useForm({});

  const type = form.watch("type") as AssType;

  async function handleOnSubmit(data: any) {
    try {
      form.reset();

      const currencyBody = await getCurrencyServerBody(data);

      if (type === "deposit") {
        await depositService.create(currencyBody, userId, data.brokerId);
      } else if (type === "cashFree") {
        await cashFreeService.create(currencyBody, userId, data.brokerId);
      } else if (type === "loan") {
        await loanService.create(currencyBody, userId, data.brokerId);
      }

      // router.refresh();
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
      <Select name="brokerId" required>
        {accounts.map((account) => (
          <option key={account._id} value={account._id}>
            {account.shortName}
          </option>
        ))}
      </Select>

      <Select name="type" required>
        <option value="">Select option</option>
        <option value="deposit">Deposit</option>
        <option value="cashFree">Cash</option>

        <option value="loan">Loan</option>
      </Select>

      <Select name="currency" required>
        {Object.keys(CURRENCY).map((currencyCode) => (
          <option key={currencyCode} value={currencyCode}>
            {CURRENCY[currencyCode as keyof typeof CURRENCY]}
          </option>
        ))}
      </Select>

      {/* <Input name="matDate" type="date" placeholder="Mat date" required /> */}

      <Input name="amount" type="number" placeholder="Amount" required />

      <Button type="submit">Create</Button>
    </FormProvider>
  );

  async function onSubmit(data: any) {
    toast.promise(
      handleOnSubmit(data).then(() => router.refresh()),
      {
        loading: "Creating...",
        success: "Successfully created!",
        error: "Failed to create.",
      }
    );
  }
}
