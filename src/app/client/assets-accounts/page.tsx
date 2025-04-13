import * as brokerAccSevice from "@/services/BrokerAccService";
import * as bankAccService from "@/services/BankAccService";

import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssetAcc } from "./FormAssetAcc";
import { MainContainer } from "@/components/MainContainer";
import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import { getLocalDateByISO } from "@/utils/dataFormat";
import { Heading } from "@/components/Heading";
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

export default async function App() {
  const user = await getCurrentUser();
  const brokerAccounts = (await brokerAccSevice.getList(user?.id)) as Account[];
  const bankAccounts = (await bankAccService.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <MainContainer>
        <Heading>Broker accounts</Heading>
        <FormAssetAcc
          createAcc={brokerAccSevice.create}
          userId={user?.id}
          isIIS
        />

        {brokerAccounts.length > 0 && (
          <section className="overflow-x-auto">
            <section className="min-w-max w-full overflow-auto rounded-xl">
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
        <FormAssetAcc createAcc={bankAccService.create} userId={user?.id} />

        {bankAccounts.length > 0 && (
          <section className="overflow-x-auto">
            <section className="min-w-max w-full overflow-auto rounded-xl">
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
