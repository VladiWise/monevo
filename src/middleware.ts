

import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/paths"
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default auth(async (req) => {

  const providedKey = req.headers.get("x-api-key");

  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {

    if (nextUrl.pathname.startsWith("/api/auth")) {
      return;
    }

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
  unstable_allowDynamic: [
    '@/libs/mongodb.ts',
  ],
}