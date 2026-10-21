import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { useStore } from "@/context/StoreContext";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Kranjal Foundation" },
      { name: "description", content: "How Kranjal Foundation collects, uses and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Kranjal Foundation" },
      { property: "og:description", content: "How we handle your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

const sections = [
  { title: "Information We Collect", body: "We collect only what you choose to share with us: your name, contact details, donation records and volunteer preferences. We do not sell, rent or trade your personal information to any third party." },
  { title: "How We Use It", body: "Your information is used to process donations and issue receipts, coordinate volunteering, respond to enquiries and send programme updates you have opted into. Donation records are kept for statutory audit and 80G compliance." },
  { title: "Data Security", body: "Access to supporter records is limited to authorised staff of the foundation. Digital records are protected by access controls and stored securely; physical records are kept under lock at our Pune office." },
  { title: "Your Rights", body: "You may request a copy, correction or deletion of your personal data at any time by writing to kranjalfoundation@gmail.com. We will respond within 30 days." },
  { title: "Children's Privacy", body: "Photographs or details of children in our programmes are published only with guardian consent, and never with identifying information such as full names or addresses." },
  { title: "Changes to This Policy", body: "Any revision to this policy will be posted on this page with an updated date. Continued use of our website or services constitutes acceptance of the revised policy." },
];

function Privacy() {
  const f = useStore().state.foundation;
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-semibold">Privacy Policy</h1>
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
