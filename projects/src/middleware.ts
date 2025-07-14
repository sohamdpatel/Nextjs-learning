import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
const iseProtected = createRouteMatcher(["/authentication-clerk/user-profile", "/authentication-clerk/dashboard"]);
// const isPublic = createRouteMatcher(["/authentication-clerk","/"]);
const isAdmin = createRouteMatcher(["/authentication-clerk/admin(.*)"]);
export default clerkMiddleware(async (auth, req) => {
    const  { userId, redirectToSignIn } = await auth();
    console.log("User ID:", userId);
    console.log("Request URL:", iseProtected(req)); 

    if (
    isAdmin(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/authentication-clerk", req.url);
    return NextResponse.redirect(url);
  }
    
    if (!userId && iseProtected(req)) {
        // User is signed in, allow access
        console.log("User is signed out" );
    //     const redirectUrl = new URL("/authentication-clerk", req.url);
    // return Response.redirect(redirectUrl, 302);// it is redirecting to the sign-in page
    return NextResponse.redirect(new URL("/authentication-clerk", req.url));
}
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};