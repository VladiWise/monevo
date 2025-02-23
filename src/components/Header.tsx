import { signOut } from "@/auth";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Image from "next/image";
import { LogoIcon } from "./SvgIcons";
import { redirect } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "@/components/Button";
import { ThemeSwitch } from "@/components/ThemeSwitch";

import Link from "next/link";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 w-full h-16 items-center justify-between z-50 p-2 md:px-[8rem]  lg:px-[12rem]  flex bg-white  dark:bg-darkMainGray border-b border-gray-200 dark:border-[#2F3441] ">
      <section className="flex items-center gap-14 w-full sm:w-auto">
        <section className="flex items-center gap-2 w-full justify-center sm:w-auto sm:justify-normal">
          <LogoIcon size={39} />
          <p className="text-2xl font-bold text-primary dark:text-white ">
            MONEVO
          </p>
          <ThemeSwitch />
        </section>
        <Link href="/about" className="hidden md:flex">
          <Button variant="link">About</Button>
        </Link>
      </section>
      {!user && (
        <section className="flex items-center gap-2">
          <form
            action={async () => {
              "use server";

              redirect("/auth/login");
            }}
          >
            <Button variant="link" type="submit" className="hidden sm:flex">
              Personal account
            </Button>
          </form>
        </section>
      )}
      {user && (
        <section className="flex items-center gap-2">
          <Link href="/client/settings">
            <div className="flex items-center h-full">
              {user.image ? (
                <Image
                  src={user?.image}
                  alt={"user"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaCircleUser size={40} fill="#6b7280" />
              )}
            </div>
          </Link>

          <form
            className="hidden sm:flex"
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="link" type="submit">
              Sign out
            </Button>
          </form>
        </section>
      )}
    </header>
  );
}
