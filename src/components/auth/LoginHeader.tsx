import { LogoIcon } from "../SvgIcons";
import { ThemeSwitch } from "@/components/ThemeSwitch";
export function LoginHeader({ label }: { label: string }) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-1">
      <section className="flex items-center justify-center gap-2 w-full relative h-12">
        <LogoIcon size={39} />
        <p className="text-2xl font-bold text-primary dark:text-white">MONEVO</p>
        <ThemeSwitch />

      </section>

      <p className="text-muted-foreground text-sm text-darkGray dark:text-darkGray">{label}</p>
    </section>
  );
}
