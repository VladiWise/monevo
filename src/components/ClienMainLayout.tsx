import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import clsx from "clsx";
export function ClientMainLayout({
  children,
  className,
  isNavbar = true,
}: {
  children: React.ReactNode;
  className?: string;
  isNavbar?: boolean;
}) {
  return (
    <>
     { isNavbar &&<Header />}
   {   isNavbar && <Navbar />}
      <main
        className={clsx(
          "flex flex-col items-center h-full min-h-fit w-full pb-[4.5rem] pt-[4.5rem] px-4 sm:px-4  sm:pb-[5.5rem] sm:pt-20 md:pb-4 md:pl-[12rem] md:pt-20 overflow-x-hidden",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
