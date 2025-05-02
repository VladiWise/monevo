import * as brokerAccSevice from "@/services/BrokerAccService";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import { AccountLayout } from "@/components/AccountLayout";

type Account = {
  _id: string;
  shortName: string;
  fullName: string;
  isIIS: boolean;
  userId: string;
};

export default async function App() {
  const user = await getCurrentUser();
  const accounts = (await brokerAccSevice.getList(user?.id)) as Account[];

  return (
    <div className="flex flex-col items-center gap-4 w-full ">
      {accounts.map(async (account) => {
        const accSum = await brokerAccSevice.getTotal(account._id);

        return (
          <AccountLayout
            type="assets"
            accountId={account._id}
            key={account._id}
            header={account.shortName}
            sum={accSum}
          />
        );
      })}
    </div>
  );
}
