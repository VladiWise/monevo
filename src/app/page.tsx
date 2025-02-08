import { Button } from "@/components/Button";
import { LoginButton } from "@/components/auth/LoginButton";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
export default async function MainPage() {
  const user = await getCurrentUser();
  return (
    <>
      <Header />
      {user && <Navbar />}
      
      {user && (
        <main className="flex flex-col items-center h-full min-h-fit w-full pb-16 sm:pt-4 sm:px-4 md:pb-4 md:pl-[12rem] overflow-x-hidden">
          <section className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">Auth</h1>

            <LoginButton>
              <Button variant="simple">Sing in</Button>
            </LoginButton>
          </section>
        </main>
      )}
    </>
  );
}
