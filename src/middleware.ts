import { NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";
import { withRedirectToAuth } from "./middlewares/withRedirectToAuth";
import { withRedirectToSetPassword } from "./middlewares/withRedirectToSetPassword";
import { withRedirectToCompleteProfile } from "./middlewares/withRedirectToCompleteProfile";

export default withAuth(
  withRedirectToAuth(
    withRedirectToSetPassword(
      withRedirectToCompleteProfile(() => NextResponse.next())
    )
  )
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
