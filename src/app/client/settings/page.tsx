import { signOut } from "@/auth";
import { getCurrentUser } from "@/auth-actions/getCurrentUser";
import Image from "next/image";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  return (
    <div className="w-full overflow-x-auto">
      <h1>{JSON.stringify(user, null, 2)}</h1>
      {user?.image && (
        <Image
          src={user?.image}
          alt={"user"}
          width={96}
          height={96}
          className="rounded-full"
        />
      )}

      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo:  "/" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
