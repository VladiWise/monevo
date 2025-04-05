import clsx from "clsx";

export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={clsx(
      "text-xl font-bold text-darkMain dark:text-white w-full",
      className
    )}
  >
    {children}
  </h1>
);
