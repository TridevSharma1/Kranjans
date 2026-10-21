import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { useStore } from "@/context/StoreContext";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Kranjal Foundation" },
      { name: "description", content: "Terms governing the use of the Kranjal Foundation website, donations and volunteer services." },
      { property: "og:title", content: "Terms of Use — Kranjal Foundation" },
      { property: "og:description", content: "Terms governing use of our website and services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

const sections = [
  { title: "Use of This Website", body: "This website is provided for information about Kranjal Foundation and its programmes. You agree to use it lawfully and not to attempt unauthorised access to any part of the site or its administrative systems." },
  { title: "Donations", body: "All donations are voluntary and, unless a written agreement states otherwise, are used at the foundation's discretion across its programmes. Donations are eligible for tax exemption under Section 80G as per our applicable certificates, and receipts are issued for every successful contribution." },
  { title: "Verification Services", body: "The identity-card and certificate verification tools on this site are provided for employers, partners and recipients to confirm documents issued by the foundation. A result of \"Valid\" confirms only that the number matches a record we issued on the date checked." },
  { title: "Intellectual Property", body: "All content, photographs and materials on this website are the property of Kranjal Foundation and may not be reproduced without written permission, except for personal, non-commercial reference." },
  { title: "Volunteering", body: "Volunteer placements are subject to review and availability. Volunteers agree to follow foundation policies, including codes of conduct and child-protection guidelines, while representing the foundation." },
  { title: "Limitation of Liability", body: "While we work to keep information accurate and current, the foundation accepts no liability for decisions made on the basis of website content alone. Please contact our office for formal confirmations." },
];

function Terms() {
  const f = useStore().state.foundation;
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: October 2026 · {f.name}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
