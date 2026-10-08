import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | Visit Cambodia",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: 32, textAlign: "center" }}>
          <h1 style={{ marginBottom: 12 }}>រកមិនឃើញទំព័រ · Page not found</h1>
          <p style={{ marginBottom: 20, color: "#666" }}>
            The destination you’re looking for does not exist.
          </p>
          <a href="/km" style={{ color: "#e37926", fontWeight: 700 }}>
            ត្រឡប់ទៅទំព័រដើម · Go back home
          </a>
        </main>
      </body>
    </html>
  );
}
