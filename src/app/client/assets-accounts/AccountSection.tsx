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
export async function AccountSection({user, service, isIIS}: {user: any, service: any, isIIS: boolean}) {


  const brokerAccounts = (await service.getList(user?.id)) as Account[];


  return (
    <MainContainer>
      <Heading>Broker accounts</Heading>
      <FormAssetAcc
        createAcc={service.create}
        userId={user?.id}
        isIIS={isIIS}
      />

      {brokerAccounts.length > 0 && (
        <section className="overflow-x-auto">
          <section className="min-w-max w-full overflow-auto rounded-xl">
            {brokerAccounts.map((account, i) => (

              <section key={i}>15616</section>
              
            ))}


          </section>
        </section>
      )}
    </MainContainer>
  );
}
