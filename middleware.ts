// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher:
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
// };
// import { getSession } from "@/lib/getToken";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   vendorRoutes,
//   adminRoutes,
//   authRoutes,
//   apiAuthPrefix,
// } from "./routes";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// export async function middleware(request: NextRequest) {
//   console.log("whahthaht");
//   const { nextUrl } = request;
//   const SESSION = await getSession();
//   // console.log(req.nextUrl.pathname);
//   const isLoggedIn = SESSION;
//   //   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   //   if (isApiAuthRoute) return null;
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }
//   if (!isLoggedIn) {
//     return Response.redirect(new URL("/login", nextUrl));
//   }
//   return null;
// }

// export const config = {
//   //Matcher таарвал дээд талын middleware код ажиллана.
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
