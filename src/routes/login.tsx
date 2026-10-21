import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { AuthCard } from "@/components/AuthCard";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Kranjal Foundation" },
      { name: "description", content: "Sign in or create your Kranjal Foundation member account." },
      { property: "og:title", content: "Login — Kranjal Foundation" },
      { property: "og:description", content: "Sign in or create your member account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-6 py-20">
        <AuthCard role="user" allowRegister demo="user@kranjal.org / user123" />
      </section>
    </SiteLayout>
  );
}
