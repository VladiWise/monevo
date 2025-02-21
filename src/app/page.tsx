import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Link from "next/link";
import { CommonMainLayout } from "@/components/CommonMainLayout";

export default async function MainPage() {
  const user = await getCurrentUser();

  return (
    <>
      <Header />

      <CommonMainLayout className="dark:bg-dark-svg bg-light-svg">
        <div className="flex flex-col items-center gap-14 max-w-3xl h-[calc(100vh-4rem)] pt-14">
          <h1 className="text-3xl sm:text-5xl font-bold dark:text-white text-center">
            The investment tracker you have been waiting for
          </h1>

          <p className="dark:text-white text-center">
            That&apos;s for free. No worries
          </p>
          <Link href="/auth/register">
            <Button variant="primary" type="submit" className="px-6">
              Get started
            </Button>
          </Link>
        </div>
      </CommonMainLayout>
    </>
  );
}
