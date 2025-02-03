import { Button } from "@/components/Button";
import { LoginButton } from "@/components/auth/LoginButton";

function MainPage() {
  return (
    <>
      <section className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Auth</h1>

        <LoginButton>
          <Button variant="simple">Sing in</Button>
        </LoginButton>
      </section>
    </>
  );
}

export default MainPage;
