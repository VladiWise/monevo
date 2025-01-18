import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";

import { MainContainer } from "@/components/MainContainer";

import * as fundService from "@/services/FundService";

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
    <MainContainer className="bg-white">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <AssetFormSection
        serverItems={serverItems}
        getServerBody={getEtfServerBody}
        service={service}

        accounts={accounts}
        buttonName={buttonName}
      />

      <Table
        data={serverItems}
        actions={(item) => (
          <DeleteButton id={item._id} removeItem={service.remove} />
        )}
        columns={columns}
      />
    </MainContainer>
  );
}
