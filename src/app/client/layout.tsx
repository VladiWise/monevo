import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Navbar />

      <main className="flex flex-col items-center h-full min-h-fit w-full pb-16 sm:pt-4 sm:px-4 md:pb-4 md:pl-[12rem] md:pt-20 overflow-x-hidden">
        {children}
      </main>
    </>
  );
}
