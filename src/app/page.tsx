import { Button } from "@/components/Button";
import { LoginButton } from "@/components/auth/LoginButton";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
export default async function MainPage() {
  const user = await getCurrentUser();
  return (
    <>
      <Header />
      {!user && (
        <section className="flex h-full w-full flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">Auth</h1>

          <LoginButton>
            <Button variant="simple">Sing in</Button>
          </LoginButton>
        </section>
      )}
    </>
  );
}
