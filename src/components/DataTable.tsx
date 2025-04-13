import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";

import { MainContainer } from "@/components/MainContainer";

import AssetFormSection from "@/components/AssetFormSection";

type Column = {
  title: string;
  name: string;
  getCellContent?: (item: any, columnName?: string) => React.ReactNode;
};

interface DataTableProps {
  serverItems: any;
  getEtfServerBody: (item: any, data: any, moexJson: any) => Promise<any>;
  service: any;
  bankAccounts: any;
  columns: Column[];
  buttonName?: string;
  title?: string;
}

export async function DataTable({
  serverItems,
  getEtfServerBody,
  service,
  bankAccounts,
  columns,
  buttonName,
  title,
}: DataTableProps) {
  return (
    <MainContainer>
      <h1 className="text-2xl font-bold text-darkMain dark:text-white w-full">
        {title}
      </h1>
      <AssetFormSection
        serverItems={serverItems}
        getServerBody={getEtfServerBody}
        service={service}
        bankAccounts={bankAccounts}
        buttonName={buttonName}
      />

      {serverItems.length > 0 && (
        <section className="overflow-x-auto">
          <section className="min-w-max w-full overflow-auto rounded-xl">
            <Table
              data={serverItems}
              actions={(item) => (
                <DeleteButton id={item._id} removeItem={service.remove} />
              )}
              columns={columns}
            />
          </section>
        </section>
      )}
    </MainContainer>
  );
}
