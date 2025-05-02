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
      {isNavbar && <Header />}
      {isNavbar && <Navbar />}
      <main
        className={clsx(
          "flex flex-col items-center h-full min-h-fit w-full pb-[5rem] pt-20 px-4 sm:px-4  sm:pb-[5.5rem] md:pb-4 md:pl-[12rem] overflow-x-hidden",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
