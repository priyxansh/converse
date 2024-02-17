import { NextAuthRequest } from "@/types/auth";
import { Middleware } from "@/types/middleware";
import { NextResponse } from "next/server";
import { middlewareConfig } from "../../middlewareConfig";

const excludedPaths = middlewareConfig.excludedPaths.withRedirectToAuth;

/**
 * Redirects to /auth if no session found.
 * @param middleware - The next middleware.
 */
export const withRedirectToAuth = (middleware: Middleware<NextAuthRequest>) => {
  return (req: NextAuthRequest) => {
    const session = req.auth;
    const origin = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;

    if (!session && !excludedPaths.includes(pathname)) {
      return NextResponse.redirect(origin + "/auth");
    }

    return middleware(req);
  };
};
