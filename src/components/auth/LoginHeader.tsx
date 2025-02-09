import { LogoIcon } from "../SvgIcons";
export function LoginHeader({ label }: { label: string }) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-1">
      <section className="flex items-center justify-center gap-1 w-full relative h-12">
        <LogoIcon size={30} />
        <p className="text-xl font-bold text-primary">MONEVO</p>
      </section>

      <p className="text-muted-foreground text-sm text-slate-700/90">{label}</p>
    </section>
  );
}
