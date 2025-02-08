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

      <div className="md:flex md:flex-row h-full min-h-fit w-full">
        <Navbar />
        <main className="flex flex-col items-center h-full min-h-fit w-full pb-16 sm:pt-4 sm:px-4 md:pb-4 md:pl-[12rem] overflow-x-hidden">
          {children}
        </main>
      </div>
    </>
  );
}
