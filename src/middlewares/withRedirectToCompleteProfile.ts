import { NextAuthRequest } from "@/types/auth";
import { Middleware } from "@/types/middleware";
import { NextResponse } from "next/server";

const excludedPaths = ["/auth/complete-profile"];

/**
 * Redirects to /auth/complete-profile if isProfileComplete is false.
 * @param middleware - The next middleware.
 */
export const withRedirectToCompleteProfile = (
  middleware: Middleware<NextAuthRequest>
) => {
  return (req: NextAuthRequest) => {
    const session = req.auth;
    const origin = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;

    if (
      session &&
      session.user.isProfileComplete === false &&
      session.user.isUserCreated !== false &&
      !excludedPaths.includes(pathname)
    ) {
      return NextResponse.redirect(origin + "/auth/complete-profile");
    }

    return middleware(req);
  };
};
