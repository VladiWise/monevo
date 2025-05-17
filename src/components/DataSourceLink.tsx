import Link from "next/link";
export function DataSourceLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      target="_blank"
      href={href}
      className="font-light text-xs sm:text-sm underline underline-offset-2 text-darkMain/70 dark:text-white/50 hover:text-darkMain/80 dark:hover:text-white/90 active:text-black"
    >
      {label}
    </Link>
  );
}
