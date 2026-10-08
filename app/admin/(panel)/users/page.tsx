import AdminUsers from "@/components/admin/AdminUsers";
import { redirect } from "next/navigation";
import { getAdminPrincipal } from "@/lib/admin/auth";

export default async function AdminUsersPage() {
  const principal = await getAdminPrincipal();
  if (principal?.role !== "super_admin") redirect("/admin");
  return <AdminUsers />;
}
