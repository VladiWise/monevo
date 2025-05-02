import clsx from "clsx";
import Image from "next/image";


export function Loader({ size = 100 }: { size?: number }) {
  return (
    <Image src="/spinner.svg" width={100} height={100} alt="Loading…" />

    // <div className="flex flex-row gap-2">
    //   <div
    //     className={clsx("rounded-full bg-primary animate-bounce", sizes[size])}
    //   ></div>
    //   <div
    //     className={clsx("rounded-full bg-primary animate-bounce", sizes[size])}
    //     style={{ animationDelay: "-0.3s" }}
    //   ></div>
    //   <div
    //     className={clsx("rounded-full bg-primary animate-bounce", sizes[size])}
    //     style={{ animationDelay: "-0.5s" }}
    //   ></div>
    // </div>
  );
}
