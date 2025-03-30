"use client";
import { Input, Select } from "@/components/form-elements";
import { FormProvider } from "@/components/FormContext";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { useNotification } from "@/store/useNotification";
type ServerItem = {
  _id: string;
  ticker: string;
  amount: number;
  price: number;
  currency: string;
  userId: string;
};

type BankAccounts = {
  _id: string;
  shortName: string;
  fullName?: string;
};

export default function AssetFormSection({
  bankAccounts,
  serverItems,
  getServerBody,
  service,
  buttonName = "ADD ITEM",
}: {
  bankAccounts: BankAccounts[];
  serverItems: ServerItem[];
  getServerBody: (item: any, data: any, moexJson: any) => Promise<any>;
  service: any;
  buttonName?: string;
}) {
  const router = useRouter();
  const notification = useNotification();
  const form = useForm({});

  async function handleOnSubmit(data: any) {
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

      const currentUser = await getCurrentUser();

      const serverBody = await getServerBody(
        serverItem,
        formattedData,
        moexJson
      );

      const action = isExist
        ? service.updateAccounts(serverItem._id, serverBody)
        : service.create(serverBody, currentUser?.id);

      await action;
      // router.refresh();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function onSubmit(data: any) {
    notification
      .promise(handleOnSubmit(data), {
        loading: "Fetching data...",
        success: "Data successfully fetched!",
        error: "Failed to fetch data.",
      })
      .catch(() => {});
  }

  return (
    <FormProvider
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row gap-3"
    >
      <Select name="accountId" required>
        {/* <option value="" className="hidden">
          account
        </option> */}
        {bankAccounts.map((bankAccount) => (
          <option value={bankAccount._id} key={bankAccount._id}>
            {bankAccount.shortName}
          </option>
        ))}
      </Select>

      <Input name="ticker" type="text" placeholder={"ticker"} required />

      <Input name="amount" type="number" placeholder="amount" required />
      <Button type="submit">{buttonName}</Button>
    </FormProvider>
  );
}
