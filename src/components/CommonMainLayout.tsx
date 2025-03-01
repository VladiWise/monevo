import { Header } from "@/components/Header";
import clsx from "clsx";
export function CommonMainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Header />
      <main
        className={clsx(
          "flex flex-col items-center h-full min-h-fit w-full pt-16 overflow-x-hidden",
          className
        )}
      >
        {children}
      </main>
    </>
  );
}
