import { Table } from "@/components/Table";
import { DeleteButton } from "@/components/DeleteButton";

export const TableAssets = async ({
  userId,
  accountId,
  columns,
  service,
  children,
}: {
  userId: string | undefined;
  accountId: string | undefined;
  columns: any;
  service: any;
  children?: React.ReactNode;
}) => {
  const assets = (await service.getList(userId, accountId)) as any[];

  return (
    assets.length > 0 && (
      <>
        <h1>{children}</h1>
        <section className="overflow-x-auto">
          <section className="min-w-max w-full max-h-96 overflow-auto rounded-xl">
            <Table
              data={assets}
              actions={(item) => (
                <DeleteButton id={item._id} removeItem={service.remove} />
              )}
              columns={columns}
            />
          </section>
        </section>
      </>
    )
  );
};