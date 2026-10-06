import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 32, textAlign: "center" }}>
      <h1 style={{ marginBottom: 12 }}>រកមិនឃើញទំព័រ · Page not found</h1>
      <p style={{ marginBottom: 20, color: "#666" }}>The destination you’re looking for does not exist.</p>
      <Link href="/?lang=km" style={{ color: "#e37926", fontWeight: 700 }}>
        ត្រឡប់ទៅទំព័រដើម · Go back home
      </Link>
    </main>
  );
}
