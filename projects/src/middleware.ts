// import { auth as clerkAuth  } from '@clerk/nextjs/server';

// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   // const { userId, sessionClaims } = await clerkAuth();
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === '/nextauth-verification/login' || path === '/nextauth-verification/signup' || path === '/nextauth-verification/verifyemail'

//   if (path.startsWith("/authentication-clerk")) {
//     const { userId, sessionClaims } = await clerkAuth();

//     if (!userId) {
//       return NextResponse.redirect(new URL("/authentication-clerk", request.url));
//     }

//     if (path.startsWith("/authentication-clerk/admin") && sessionClaims?.metadata?.role !== "admin") {
//       return NextResponse.redirect(new URL("/authentication-clerk", request.url));
//     }
//   }

//   // const token = request.cookies.get("token")?.value || ''

//   // return NextResponse.redirect(new URL('/home', request.url))
// }

// export const config = {
//   matcher: [
//     "/authentication-clerk/:path*",
//     "/nextauth-verification/:path*",
//   ],
// }

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {toast} from "react-hot-toast";
const iseProtected = createRouteMatcher([
  "/authentication-clerk/user-profile",
  "/authentication-clerk/dashboard",
]);
// const isPublic = createRouteMatcher(["/authentication-clerk","/"]);
const isAdmin = createRouteMatcher(["/authentication-clerk/admin(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  

  const path = req.nextUrl.pathname

   if (path.startsWith("/nextauth-verification")) {

    const publicNextAuthRoutes = ["/login", "/signup", "/verifyemail"];
    const isPublic = publicNextAuthRoutes.some((publicPath) =>
      path.startsWith(`/nextauth-verification${publicPath}`)
    );

    const token = req.cookies.get("token")?.value || ''
    if(isPublic && token){
      return NextResponse.redirect(
          new URL("/nextauth-verification/profile", req.url)
        );
    }

    if (!isPublic && !path.startsWith(`/nextauth-verification/api`)) {

      if (!token && !path.match('/nextauth-verification')) {
        return NextResponse.redirect(
          new URL("/nextauth-verification/login", req.url)
        );
      }
    }
  }

  if (
    isAdmin(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/authentication-clerk", req.url);
    return NextResponse.redirect(url);
  }

  if (!userId && iseProtected(req)) {
    // User is signed in, allow access
    console.log("User is signed out");
    //     const redirectUrl = new URL("/authentication-clerk", req.url);
    // return Response.redirect(redirectUrl, 302);// it is redirecting to the sign-in page
    return NextResponse.redirect(new URL("/authentication-clerk", req.url));
  }
});

export const config = {
  matcher: [
    "/authentication-clerk/:path*", // clerk protected routes
    "/nextauth-verification/:path*", 
  ],  
};
