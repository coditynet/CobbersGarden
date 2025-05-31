import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect only the /admin route
    "/admin/:path*",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}; 