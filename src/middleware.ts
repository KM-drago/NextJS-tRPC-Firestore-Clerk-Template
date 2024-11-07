/**
 * Clerk Setup
 * More info at https://clerk.com/docs/quickstarts/nextjs
 *
 * Please provide env variables in env.local
 * NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
 * CLERK_SECRET_KEY=YOUR_SECRET_KEY
 *
 * To use Clerk with tRPC you need to provide context to every tRPC call
 * See src/server/trpc.ts file
 *
 * For server side calls auth object is derived in src/app/_trpc/server.ts
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRouteArr = ["/", "/hello"];

const isPublicRoute = createRouteMatcher(publicRouteArr);

/**
 * This middleware protects all routes except routs in publicRouteArr
 * refer https://clerk.com/docs/references/nextjs/clerk-middleware for more info
 */
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
