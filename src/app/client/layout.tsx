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

      <main className="flex flex-col items-center h-full min-h-fit w-full pb-[4.5rem] pt-[4.5rem] sm:px-4  sm:pb-[5.5rem] sm:pt-20 md:pb-4 md:pl-[12rem] md:pt-20 overflow-x-hidden">
        {children}
      </main>
    </>
  );
}
