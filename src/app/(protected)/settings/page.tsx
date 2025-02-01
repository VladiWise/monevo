import { signOut } from "@/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";

export default async function SettingsPage() {
  const user = await useCurrentUser();

  return (
    <div className="w-full min-w-fit">
      <h1>{JSON.stringify(user, null, 2)}</h1>

      <Image
        src={user?.image || "avatar.png"}
        alt={"user"}
        width={96}
        height={96}
        className="rounded-full"
      />

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sing out</button>
      </form>
    </div>
  );
}
