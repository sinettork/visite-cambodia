import AdminPlaceEditor from "@/components/admin/AdminPlaceEditor";
import { getAdminPrincipal } from "@/lib/admin/auth";

export const metadata = { title: "New Place — Admin" };

export default async function AdminPlaceNewPage() {
  const principal = await getAdminPrincipal();
  return <AdminPlaceEditor slug={null} role={principal?.role ?? "editor"} />;
}
