import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/alerts(.*)",
  "/api/sensors(.*)",
  "/api/residents(.*)",
  "/api/maintenance(.*)",
  "/api/billing(.*)",
  "/api/hospital(.*)",
  "/api/school(.*)",
  "/api/government(.*)",
  "/api/ai/report(.*)",
  "/api/ai/diagnosis(.*)",
  "/api/iot/stream(.*)",
  "/api/visitors(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
}, { publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_your_clerk_publishable_key" });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
