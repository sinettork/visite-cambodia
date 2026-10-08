import AdminSettings from "@/components/admin/AdminSettings";
import { getAdminPrincipal } from "@/lib/admin/auth";

export default async function AdminSettingsPage() {
  const principal = await getAdminPrincipal();
  return <AdminSettings role={principal?.role ?? "editor"} />;
}
