"use client";

import { useEffect, useState } from "react";
import * as brokerAccSevice from "@/services/BrokerAccService";
import * as bankAccService from "@/services/BankAccService";

import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssetAcc } from "./FormAssetAcc";
import { MainContainer } from "@/components/MainContainer";
import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import { getLocalDateByISO } from "@/utils/dataFormat";
import { Heading } from "@/components/Heading";
import toast from "react-hot-toast";

type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

const BrokerAccountColumns = [
  {
    title: "Created",
    name: "createdAt",
    getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
  },
  {
    title: "shortName",
    name: "shortName",
  },
  {
    title: "fullName",
    name: "fullName",
  },
  {
    title: "Is this IIS",
    name: "isIIS",
    getCellContent: (item: any) => item.isIIS.toString(),
  },
];

const BankAccountColumns = [
  {
    title: "Created",
    name: "createdAt",
    getCellContent: (item: any) => getLocalDateByISO(item.createdAt),
  },
  {
    title: "shortName",
    name: "shortName",
  },
  {
    title: "fullName",
    name: "fullName",
  },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");

  const [brokerAccounts, setBrokerAccounts] = useState<Account[]>([]);
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetchTableAccountPageData();
  }, []);

  async function fetchTableAccountPageData() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      const user = await getCurrentUser();
      const brokerAccounts = (await brokerAccSevice.getList(
        user?.id
      )) as Account[];
      const bankAccounts = (await bankAccService.getList(
        user?.id
      )) as Account[];

      if (!user) throw new Error("User not found");

      setBrokerAccounts(brokerAccounts);
      setBankAccounts(bankAccounts);

      setUserId(user.id);
      setIsLoading(false);

      setTrigger((prev) => !prev);
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading>Broker accounts</Heading>
        <FormAssetAcc
          createAcc={brokerAccSevice.create}
          userId={userId}
          isIIS
        />

        {brokerAccounts.length > 0 && (
          <section className="overflow-x-auto">
            <section className="min-w-max w-full  overflow-auto rounded-xl">
              <Table
                data={brokerAccounts}
                actions={(item) => (
                  <DeleteButton
                    id={item._id}
                    removeItem={brokerAccSevice.remove}
                  />
                )}
                columns={BrokerAccountColumns}
              />
            </section>
          </section>
        )}
      </MainContainer>

      <MainContainer>
        <Heading>Bank accounts</Heading>
        <FormAssetAcc createAcc={bankAccService.create} userId={userId} />

        {bankAccounts.length > 0 && (
          <section className="overflow-x-auto">
            <section className="min-w-max w-full  overflow-auto rounded-xl">
              <Table
                data={bankAccounts}
                actions={(item) => (
                  <DeleteButton
                    id={item._id}
                    removeItem={bankAccService.remove}
                  />
                )}
                columns={BankAccountColumns}
              />
            </section>
          </section>
        )}
      </MainContainer>
    </div>
  );
}
