import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthCard } from "@/components/AuthCard";
import { Logo } from "@/components/documents";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin_/login")({
  head: () => pageMeta("Admin Login", "Secure sign-in for Kranjal Foundation administrators."),
  component: () => (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-primary px-6 py-16">
      <Link to="/" className="mb-8"><Logo light /></Link>
      <div className="w-full max-w-md"><AuthCard role="admin" demo="admin@kranjal.org / admin123" /></div>
    </div>
  ),
});
