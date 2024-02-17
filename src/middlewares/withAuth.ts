import { auth } from "@/lib/auth";
import { NextAuthRequest } from "@/types/auth";
import { Middleware } from "@/types/middleware";
import { NextResponse } from "next/server";

/**
 * Attaches auth object to the request object.
 * @param middleware - The next middleware.
 */
export const withAuth = (middleware: Middleware<NextAuthRequest>) => {
  return auth((req) => {
    return middleware(req) as NextResponse;
  });
};
