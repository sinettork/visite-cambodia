"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { AdminRole } from "@/lib/admin/auth";

const sections = [
  {
    title: "Workspace",
    items: [
      { href: "/admin", label: "Dashboard", icon: "fa-house" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/places", label: "Places", icon: "fa-location-dot" },
      { href: "/admin/provinces", label: "Provinces", icon: "fa-map" },
      { href: "/admin/media", label: "Media library", icon: "fa-images" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/activity", label: "Activity log", icon: "fa-clock-rotate-left" },
      { href: "/admin/settings", label: "Settings", icon: "fa-gear" },
    ],
  },
];

export default function AdminShell({ children, email, role }: {
  children: ReactNode;
  email: string;
  role: AdminRole;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLButtonElement>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  const visibleSections = role === "super_admin"
    ? sections.map((section) => section.title === "System"
      ? { ...section, items: [...section.items, { href: "/admin/users", label: "Administrators", icon: "fa-users-gear" }] }
      : section)
    : sections;

  async function logout() {
    setSigningOut(true);
    setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Unable to sign out.");
      router.replace("/admin/login");
      router.refresh();
    } catch (logoutError) {
      setError(logoutError instanceof Error ? logoutError.message : "Unable to sign out.");
      setSigningOut(false);
    }
  }

  const displayName = email.split("@")[0];
  const initial = email.slice(0, 1).toUpperCase();
  const roleLabel = role === "super_admin" ? "Super admin" : role === "admin" ? "Admin" : "Editor";

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  useEffect(() => {
    if (!sidebarOpen) mobileMenuRef.current?.focus();
  }, [sidebarOpen]);

  return (
    <div className={`admin-layout${sidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
      {/* ── Topbar ── */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <button
            ref={mobileMenuRef}
            className="admin-mobile-menu"
            type="button"
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <i className={`fa-solid ${sidebarOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
          </button>
          <Link className="admin-topbar-brand" href="/admin" aria-label="Visit Cambodia Admin home">
            <span className="admin-brand-mark" aria-hidden="true">
              <i className="fa-solid fa-gem" style={{ fontSize: "12px" }} />
            </span>
            <span className="admin-brand-name">Visit Cambodia</span>
          </Link>
        </div>
        <div className="admin-topbar-actions">
          <Link className="admin-topbar-icon" href="/admin/activity" aria-label="Activity log" title="Activity log">
            <i className="fa-regular fa-bell" aria-hidden="true" />
          </Link>
          <div className="admin-topbar-user" title={`${email} · ${roleLabel}`}>
            <div className="admin-topbar-avatar">{initial}</div>
            <span className="admin-topbar-user-name">{displayName}</span>
            <span className="admin-topbar-role">{roleLabel}</span>
          </div>
        </div>
      </header>

      {/* ── Mobile scrim ── */}
      {sidebarOpen && (
        <button className="admin-sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar${sidebarOpen ? " is-open" : ""}`}>
        <div className="admin-sidebar-heading">
          <button
            className="admin-sidebar-collapse"
            type="button"
            aria-label={sidebarCollapsed ? "Expand navigation" : "Collapse navigation"}
            aria-pressed={sidebarCollapsed}
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            title={sidebarCollapsed ? "Expand" : "Collapse"}
          >
            <i className={`fa-solid ${sidebarCollapsed ? "fa-angles-right" : "fa-angles-left"}`} aria-hidden="true" />
          </button>
        </div>
        <nav className="admin-navigation" aria-label="Admin navigation">
          {visibleSections.map((section) => (
            <div className="admin-navigation-group" key={section.title}>
              <p className="admin-navigation-heading">{section.title}</p>
              {section.items.map((item) => {
                const active = item.href === "/admin"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    className={`admin-navigation-link${active ? " is-active" : ""}`}
                    href={item.href}
                    key={item.href}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <footer className="admin-sidebar-footer">
          <Link href="/en" target="_blank" rel="noreferrer" title="Open public website">
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            <span>Public site</span>
          </Link>
          <button type="button" onClick={() => void logout()} disabled={signingOut}>
            <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true" />
            <span>{signingOut ? "Signing out…" : "Sign out"}</span>
          </button>
          {error && <p className="admin-alert" role="alert">{error}</p>}
        </footer>
      </aside>

      {/* ── Main ── */}
      <main className="admin-main">
        <div className="admin-main-content">{children}</div>
        <footer className="admin-footer">
          <span>© 2000–{new Date().getFullYear()} Visit Cambodia Co., Ltd.</span>
        </footer>
      </main>
    </div>
  );
}
