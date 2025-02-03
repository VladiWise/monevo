"use client";
import { Input, Select } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type ServerItem = {
  _id: string;
  ticker: string;
  amount: number;
  price: number;
  currency: string;
  userId: string;
};

// type Service = {
//   getMoex: (ticker: string) => Promise<any>;
//   createItem: (data: any) => Promise<any>;
//   updateAccounts: (id: string, data: any) => Promise<any>;
// };

type Account = {
  _id: string;
  shortName: string;
  fullName?: string;
};

export default function AssetFormSection({
  accounts,
  serverItems,
  getServerBody,
  service,
  buttonName = "ADD ITEM",
}: {
  accounts: Account[];
  serverItems: ServerItem[];
  getServerBody: (item: any, data: any, moexJson: any) => Promise<any>;
  service: any;
  buttonName?: string;
}) {
  const router = useRouter();

  const form = useForm({});

  async function onSubmit(data: any) {
    try {
      form.reset();

      const formattedData = {
        accountId: data.accountId,
        ticker: data.ticker.trim().toUpperCase(),
        amount: +data.amount,
      };

      const serverItem = serverItems?.find(
        (serverItem) => serverItem.ticker === formattedData.ticker
      );
      const isExist = !!serverItem;

      const moexJson = await service.getMoex(formattedData.ticker);
      console.log("moexJson", moexJson);

      const serverBody = await getServerBody(
        serverItem,
        formattedData,
        moexJson
      );

      const action = isExist
        ? service.updateAccounts(serverItem._id, serverBody)
        : service.create(serverBody);

      await action;
      router.refresh();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <FormProvider
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <Select name="accountId" required>
        <option value="" className="hidden">
          account
        </option>
        {accounts.map((account) => (
          <option value={account._id} key={account._id}>
            {account.shortName}
          </option>
        ))}
      </Select>

      <Input name="ticker" type="text" placeholder={"ticker"} required />

      <Input name="amount" type="number" placeholder="amount" required />
      <Button type="submit">{buttonName}</Button>
    </FormProvider>
  );
}
