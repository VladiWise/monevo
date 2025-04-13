import { Heading } from "@/components/Heading";

export async function AssetLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: string;
}) {
  return (
    <section className="flex flex-col gap-3">
      <Heading>{header}</Heading>
      <section className="overflow-x-auto">
        <section className="min-w-max w-full overflow-auto rounded-xl">
          {children}
        </section>
      </section>
    </section>
  );
}
