import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
// import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Link from "next/link";
import { CommonMainLayout } from "@/components/CommonMainLayout";
import Image from "next/image";

export default async function MainPage() {


  return (
    <>
      <Header />

      <CommonMainLayout className="dark:bg-dark-svg bg-light-svg">
        <div className="flex flex-col items-center gap-14 max-w-3xl h-[calc(100vh-4rem)] pt-11">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-center">
            The investment tracker you have been waiting for
          </h1>

          <p className="dark:text-white text-center">
            That&apos;s for free. No worries
          </p>

          <Link href="/auth/register">
            <Button
              variant="prim"
              type="submit"
              className="relative overflow-hidden px-6"
            >
              <div className=" absolute w-36 h-36 animate-spin [animation-duration:5s]  bg-gradient-to-r from-[#EF3226] from-7% to-[rgba(11,12,15)] to-40%"></div>

              <span className="relative z-10">Get started</span>
            </Button>
          </Link>
        </div>
      </CommonMainLayout>
    </>
  );
}
