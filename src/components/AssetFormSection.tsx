"use client";
import { Input, Select } from "@/components/form-elements";
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

  const {
    register,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  async function onSubmit(data: any) {
    try {
      reset();

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3">
      <Select name="accountId" register={register} required>
        <option value="" className="hidden">
          Select account
        </option>
        {accounts.map((account) => (
          <option value={account._id} key={account._id}>
            {account.shortName}
          </option>
        ))}
      </Select>

      <Input
        name="ticker"
        type="text"
        placeholder={"Enter ticker"}
        register={register}
        required
      />

      <Input
        name="amount"
        type="number"
        placeholder="Enter amount"
        register={register}
        required
      />
      <Button type="submit">{buttonName}</Button>
    </form>
  );
}
