import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Asdfsdf");
  NextResponse.redirect(new URL("/photo-share", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
