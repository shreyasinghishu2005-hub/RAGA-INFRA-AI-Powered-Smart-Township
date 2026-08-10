import { NextResponse } from "next/server";

export type Role =
  | "SUPER_ADMIN"
  | "TOWNSHIP_MANAGER"
  | "RESIDENT"
  | "VISITOR"
  | "COMPANY_ADMIN"
  | "HOSPITAL_ADMIN"
  | "SCHOOL_ADMIN"
  | "GOVERNMENT_OFFICER"
  | "MAINTENANCE_STAFF"
  | "SECURITY_OFFICER"
  | "EMERGENCY_TEAM";

export function getUserRole(
  sessionClaims: Record<string, unknown> | null
): Role | null {
  if (!sessionClaims) return null;
  const meta = sessionClaims.metadata as Record<string, unknown> | undefined;
  return (meta?.role as Role) ?? null;
}

export function requireRole(
  sessionClaims: Record<string, unknown> | null,
  allowedRoles: Role[]
): NextResponse | null {
  const role = getUserRole(sessionClaims);
  if (!role || !allowedRoles.includes(role)) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Insufficient permissions" } },
      { status: 403 }
    );
  }
  return null;
}

export function hasPermission(
  role: Role | null,
  allowedRoles: Role[]
): boolean {
  if (!role) return false;
  return allowedRoles.includes(role);
}
