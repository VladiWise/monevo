import clsx from "clsx";

interface LoaderProps {
  size?: keyof typeof sizes;
}

const sizes = {
  "4": "w-4 h-4",
  "8": "w-8 h-8",
  "10": "w-10 h-10",
  "12": "w-12 h-12",
};

export function Loader({ size = "4" }: LoaderProps) {
  return (
    <div className="flex flex-row gap-2">
      <div
        className={clsx("rounded-full bg-primary animate-bounce", sizes[size])}
      ></div>
      <div
        className={clsx("rounded-full bg-primary animate-bounce", sizes[size])}
        style={{ animationDelay: "-0.3s" }}
      ></div>
      <div
        className={clsx("rounded-full bg-primary animate-bounce", sizes[size])}
        style={{ animationDelay: "-0.5s" }}
      ></div>
    </div>
  );
}
