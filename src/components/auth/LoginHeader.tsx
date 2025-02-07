import { LogoIcon } from "../SvgIcons";
export function LoginHeader({ label }: { label: string }) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-1">
      <section className="flex items-center justify-center gap-1 w-full relative h-12">
        <h1 className="text-2xl font-bold">Monevo</h1>

        <div className="top-0 right-0 absolute">
          <LogoIcon size={46} />
        </div>
      </section>

      <p className="text-muted-foreground text-sm text-slate-700/90">{label}</p>
    </section>
  );
}
