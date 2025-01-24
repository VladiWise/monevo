export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full max-w-xs flex items-center justify-center">{children}</div>
  );
}
