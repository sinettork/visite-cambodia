import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const configured = isAdminConfigured();
  let sessionCheckError = "";
  let authenticated = false;
  if (configured) {
    try {
      authenticated = await isAdminAuthenticated();
    } catch (error) {
      console.error("Unable to verify the existing admin session.", error);
      sessionCheckError = "The admin session could not be checked. Please try again.";
    }
  }
  if (authenticated) redirect("/admin");

  return (
    <main className="admin-page admin-login-page">
      <section className="admin-panel admin-login-card">
        <p className="admin-eyebrow">Visit Cambodia</p>
        <h1>Admin sign in</h1>
        {configured
          ? <>{sessionCheckError && <div className="admin-alert" role="alert">{sessionCheckError}</div>}<AdminLoginForm /></>
          : (
            <div className="admin-alert" role="alert">
              Admin sign-in is not configured. Set a valid `ADMIN_EMAIL` and a strong
              `ADMIN_PASSWORD` in the server environment, then restart the app.
            </div>
          )}
      </section>
    </main>
  );
}
