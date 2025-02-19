import clsx from "clsx";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
}

export function MainContainer({
  children,
  className,
  border,
}: MainContainerProps) {
  return (
    <section
      className={clsx(
        "flex flex-col gap-3 p-4 w-full rounded-2xl bg-white dark:bg-[#1D202A]",
        className,
        border ? "border-2" : ""
      )}
    >
      {children}
    </section>
  );
}
