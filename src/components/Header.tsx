import { signOut } from "@/auth";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Image from "next/image";
import { LogoIcon } from "./SvgIcons";

import { FaCircleUser } from "react-icons/fa6";
import { PiSignOutDuotone } from "react-icons/pi";

export async function Header() {
  const user = await getCurrentUser();
  return (
    <header className="fixed top-0 left-0 w-full h-16 items-center justify-between z-50 p-2 hidden md:flex bg-white shadow">
      <section className="flex items-center gap-2">
        <LogoIcon size={30} />
        <p className="text-xl font-bold text-primary">MONEVO</p>
      </section>

      {user && (
        <section className="flex items-center gap-2">
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

          <form
            action={async () => {
              "use server";

              await signOut({ redirectTo: "/" });
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </section>
      )}
    </header>
  );
}
