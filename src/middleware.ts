import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Get the session from the request
  const session = req.auth;

  // Get origin and pathname from the request URL
  const origin = req.nextUrl.origin;
  const pathname = req.nextUrl.pathname;

  // Redirect to /auth if no session found
  if (!session && pathname !== "/") {
    return NextResponse.redirect(origin + "/auth");
  }

  // Redirect to /auth/set-password if isUserCreated is false
  if (session && session.user.isUserCreated === false) {
    return NextResponse.redirect(origin + "/auth/set-password");
  }

  // Redirect to /complete-profile if isProfileComplete is false
  if (session && session.user.isProfileComplete === false) {
    return NextResponse.redirect(origin + "/auth/complete-profile");
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/chat/:path*"],
};
