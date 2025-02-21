import { ClientMainLayout } from "@/components/ClienMainLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientMainLayout>{children}</ClientMainLayout>;
}
