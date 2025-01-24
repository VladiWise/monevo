import { auth, signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();

  const user = session?.user?.email;

  return (
    <div>
      <h1>{user} HELLO!!!!</h1>

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
