import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminPrincipal, isAdminConfigured } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!isAdminConfigured()) redirect("/admin/login");
  const principal = await getAdminPrincipal();
  if (!principal) redirect("/admin/login");
  return <AdminShell email={principal.email} role={principal.role}>{children}</AdminShell>;
}
