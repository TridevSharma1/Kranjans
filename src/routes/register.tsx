import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { AuthCard } from "@/components/AuthCard";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Kranjal Foundation" },
      { name: "description", content: "Create your Kranjal Foundation member account." },
      { property: "og:title", content: "Register — Kranjal Foundation" },
      { property: "og:description", content: "Create your member account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SiteLayout>
      <section className="mx-auto max-w-md px-6 py-20"><AuthCard role="user" allowRegister initialMode="register" demo="any email and password" /></section>
    </SiteLayout>
  ),
});
