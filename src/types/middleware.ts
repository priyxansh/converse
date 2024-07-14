import { NextRequest, NextResponse } from "next/server";

export type Middleware<T extends NextRequest> = (req: T) => NextResponse;
