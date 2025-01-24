import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/paths"
import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);


export default auth(async (req) => {
  // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  // console.log("TOKEN::::::", token);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const providedKey = req.headers.get("x-api-key");

  console.log("API_KEY::::::::::", API_KEY);
  console.log("providedKey::::::", providedKey);


  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);


  // if (isApiRoute && providedKey !== API_KEY) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  if (isApiRoute) {

    if (providedKey !== API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }



  return;

})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',],
}