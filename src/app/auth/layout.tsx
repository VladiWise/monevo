export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full max-w-[20rem] w-full flex items-center justify-center">
      {children}
    </div>
  );
}
