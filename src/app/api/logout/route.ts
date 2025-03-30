import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });


  const response = NextResponse.json({ message: "Logged out" });

  // Set the cookie to expire

  response.cookies.set("authjs.csrf-token", "", { maxAge: 0 });
  response.cookies.set("authjs.callback-url", "", { maxAge: 0 });

  response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
  response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });
  response.cookies.set("next-auth.callback-url", "", { maxAge: 0 });

  return NextResponse.json({ message: "Cookies cleared" }, { status: 200 });
}
