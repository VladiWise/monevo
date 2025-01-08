import clsx from "clsx";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
  shadow?: boolean
}


export function MainContainer({ children, className, shadow }: MainContainerProps) {
  return (
    <section

      className={clsx("flex flex-col gap-3 p-4 min-w-max max-w-full w-full rounded-xl", className, shadow ? "shadow-own" : "")}
    >
      {children}
    </section>
  );
}
