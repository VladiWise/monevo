import { Button } from "@/components/Button";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Image from "next/image";
import Link from "next/link";
function Page() {}

export default async function MainPage() {
  const user = await getCurrentUser();

  return (
    <>
      <Header />

      {!user && (
        <main className="flex flex-col items-center h-full  w-full pb-16 sm:pt-4 sm:px-4 md:p-4 md:pt-32 overflow-x-hidden">
          <div className="flex flex-col items-center gap-10 max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-800 text-center">
              The investment tracker you have been waiting for
            </h1>

            <p>That's for free. No worries</p>

            <Button variant="secondary" type="submit" className="px-6">
              <Link href="/about">Get started</Link>
            </Button>

            <Image
              src="/card.png"
              alt="logo"
              width={1500 / 2}
              height={1080 / 2}
            />
          </div>
        </main>
      )}

      {user && (
        <>
          <Navbar />

          <main className="flex flex-col items-center h-full  w-full pb-16 sm:pt-4 sm:px-4 md:p-4 md:pt-32 overflow-x-hidden">
            <h1 className="text-5xl font-bold text-gray-800">
              Investment tracker
            </h1>

            <Image
              src="/card.png"
              alt="logo"
              width={1500 / 2}
              height={1080 / 2}
            />
          </main>
        </>
      )}
    </>
  );
}
