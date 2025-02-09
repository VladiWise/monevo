export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center h-full min-h-fit w-full p-4 overflow-x-hidden">
      <div className="h-full max-w-[20rem] w-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
