import { NextAuthRequest } from "@/types/auth";
import { Middleware } from "@/types/middleware";
import { NextResponse } from "next/server";

const excludedPaths = ["/auth/set-password"];

/**
 * Redirects to /auth/set-password if isUserCreated is false.
 * @param middleware - The next middleware.
 */
export const withRedirectToSetPassword = (
  middleware: Middleware<NextAuthRequest>
) => {
  return (req: NextAuthRequest) => {
    const session = req.auth;
    const origin = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;

    if (
      session &&
      session.user.isUserCreated === false &&
      !excludedPaths.includes(pathname)
    ) {
      return NextResponse.redirect(origin + "/auth/set-password");
    }

    return middleware(req);
  };
};
