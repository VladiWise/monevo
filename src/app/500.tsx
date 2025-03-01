import { ClientMainLayout } from "@/components/ClienMainLayout";

export default function Custom500() {
  return (
    <ClientMainLayout className="justify-center">
      <h1 className="text-3xl font-bold dark:text-white">500 - Server Error</h1>
    </ClientMainLayout>
  );
}
