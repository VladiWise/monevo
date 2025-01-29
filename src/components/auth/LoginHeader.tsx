export function LoginHeader({ label }: { label: string }) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">FondFlow</h1>
      <p className="text-muted-foreground text-sm text-slate-700/90">{label}</p>
    </section>
  );
}
