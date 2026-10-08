import AdminPlacesList from "@/components/admin/AdminPlacesList";
import { getAdminPrincipal } from "@/lib/admin/auth";

export default async function AdminPlacesPage({ searchParams }: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [params, principal] = await Promise.all([searchParams, getAdminPrincipal()]);
  const initialStatus = params.status === "published" || params.status === "draft" || params.status === "paused"
    ? params.status
    : "all";
  return (
    <AdminPlacesList
      role={principal?.role ?? "editor"}
      initialStatus={initialStatus}
    />
  );
}
