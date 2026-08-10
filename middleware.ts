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

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
