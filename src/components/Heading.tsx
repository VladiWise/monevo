import clsx from "clsx";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ children, className }: HeadingProps) => (
  <h1
    className={clsx(
      "text-xl font-bold text-darkMain dark:text-white w-full",
      className
    )}
  >
    {children}
  </h1>
);
