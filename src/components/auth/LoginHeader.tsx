import { LogoIcon } from "../SvgIcons";
export function LoginHeader({ label }: { label: string }) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-1">
      <section className="flex items-center gap">
        
        <h1 className="text-2xl font-bold">Penny</h1>
        <LogoIcon size={48} />
      </section>

      <p className="text-muted-foreground text-sm text-slate-700/90">{label}</p>
    </section>
  );
}
