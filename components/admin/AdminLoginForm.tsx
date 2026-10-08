"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Unable to sign in.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <label>
        Email
        <input name="email" type="email" autoComplete="username" required maxLength={254} />
      </label>
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required maxLength={1024} />
      </label>
      {error && <p className="admin-alert" role="alert">{error}</p>}
      <button className="admin-primary-button" type="submit" disabled={pending}>
        <i className={`fa-solid ${pending ? "fa-spinner fa-spin" : "fa-right-to-bracket"}`} aria-hidden="true" />
        {" "}
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <a className="admin-back-link" href="/km"><i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back to Visit Cambodia</a>
    </form>
  );
}
