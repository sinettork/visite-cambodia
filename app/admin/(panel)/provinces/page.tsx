import AdminContentManager from "@/components/admin/AdminContentManager";
import { getAdminPrincipal } from "@/lib/admin/auth";

export default async function AdminProvincesPage({ searchParams }: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const [principal, params] = await Promise.all([getAdminPrincipal(), searchParams]);
  const initialSlug = params.slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(params.slug) ? params.slug : "";
  return <AdminContentManager scope="provinces" role={principal?.role ?? "editor"} initialSlug={initialSlug} />;
}
