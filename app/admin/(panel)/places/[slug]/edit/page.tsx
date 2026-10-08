import AdminPlaceEditor from "@/components/admin/AdminPlaceEditor";
import { getAdminPrincipal } from "@/lib/admin/auth";

export default async function AdminPlaceEditPage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, principal] = await Promise.all([params, getAdminPrincipal()]);
  const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null;
  return <AdminPlaceEditor slug={safeSlug} role={principal?.role ?? "editor"} />;
}
