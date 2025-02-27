import * as accountSevice from "@/services/AccountService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { FormAssetAcc } from "./FormAssetAcc";
import { MainContainer } from "@/components/MainContainer";
import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";
import { getLocalDateByISO } from "@/utils/dataFormat";
type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

const accountColumns = [
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

export default async function App() {
  const user = await getCurrentUser();
  const accounts = (await accountSevice.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-10 w-full ">
      <h1>Broker accounts</h1>
      <MainContainer>
        <FormAssetAcc createAcc={accountSevice.create} userId={user?.id} />


        {accounts.length > 0 && (
          <section className="overflow-x-auto">
            <section className="min-w-max w-full max-h-96 overflow-auto rounded-xl">
              <Table
                data={accounts}
                actions={(item) => (
                  <DeleteButton
                    id={item._id}
                    removeItem={accountSevice.remove}
                  />
                )}
                columns={accountColumns}
              />
            </section>
          </section>
        )}
      </MainContainer>
    </div>
  );
}
