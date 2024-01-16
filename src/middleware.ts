import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import {
  apiAuthPrefix,
  authRoutes,
  dashboardForbiddenRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./lib/routes";

export const runtime = "experimental-edge";

export default auth(async (request) => {
  const { nextUrl } = request;
  const isLoggedIn = !!request.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDashboard = dashboardForbiddenRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl),
      );
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(
      new URL("/login", nextUrl),
    );
  }

  if (isDashboard && isLoggedIn) {
    return NextResponse.redirect(
      new URL("/dashboard/settings", nextUrl),
    );
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
