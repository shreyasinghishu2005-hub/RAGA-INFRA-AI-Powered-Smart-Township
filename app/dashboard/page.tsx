import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardIndexPage() {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as Record<string, string> | undefined)?.role;

  const roleRoutes: Record<string, string> = {
    SUPER_ADMIN: "/dashboard/super-admin",
    TOWNSHIP_MANAGER: "/dashboard/township",
    RESIDENT: "/dashboard/resident",
    SECURITY_OFFICER: "/dashboard/security",
    HOSPITAL_ADMIN: "/dashboard/hospital",
    SCHOOL_ADMIN: "/dashboard/school",
    COMPANY_ADMIN: "/dashboard/company",
    GOVERNMENT_OFFICER: "/dashboard/government",
    MAINTENANCE_STAFF: "/dashboard/township",
    EMERGENCY_TEAM: "/dashboard/ai-command",
  };

  redirect(roleRoutes[role ?? ""] ?? "/dashboard/township");
}
