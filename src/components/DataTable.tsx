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
  accounts: any;
  columns: Column[];
  buttonName?: string;
  title?: string;
}

export async function DataTable({
  serverItems,
  getEtfServerBody,
  service,
  accounts,
  columns,
  buttonName,
  title,
}: DataTableProps) {
  return (
    <MainContainer>
      <h1 className="text-2xl font-bold text-gray-800 w-full">{title}</h1>
      <AssetFormSection
        serverItems={serverItems}
        getServerBody={getEtfServerBody}
        service={service}
        accounts={accounts}
        buttonName={buttonName}
      />

      <section className="overflow-x-auto">
        <section className="w-max">
          <Table
            data={serverItems}
            actions={(item) => (
              <DeleteButton id={item._id} removeItem={service.remove} />
            )}
            columns={columns}
          />
        </section>
      </section>
    </MainContainer>
  );
}
