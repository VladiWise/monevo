export function LoginHeader({ label }: { label: string }) {
  return (
    <section className="w-full flex flex-col gay-y-4 items-center justify-center">
      <h1 className="text-3xl font-bold">Auth</h1>
      <p className="text-muted-foreground text-sm text-slate-700/90">{label}</p>
    </section>
  );
}
