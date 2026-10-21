import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { Field, Badge, EmptyState } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import { Certificate, PrintBar } from "@/components/documents";
import { verifyCertificate, type VerifyStatus } from "@/utils/verify";
import type { Row } from "@/context/StoreContext";
import education from "@/assets/education.jpg";

export const Route = createFileRoute("/verify-certificate")({
  head: () => ({
    meta: [
      { title: "Verify Certificate — Kranjal Foundation" },
      { name: "description", content: "Verify the authenticity of any Kranjal Foundation certificate by its certificate number." },
      { property: "og:title", content: "Verify Certificate — Kranjal Foundation" },
      { property: "og:description", content: "Verify any certificate by its number." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyCertificate,
});

const statusCopy: Record<VerifyStatus, { label: string; badge: string }> = {
  valid: { label: "Valid — this certificate is genuine and currently valid.", badge: "Valid" },
  invalid: { label: "Invalid — no certificate matches this number.", badge: "Invalid" },
  expired: { label: "Expired — this certificate has passed its expiry date.", badge: "Expired" },
  revoked: { label: "Revoked — this certificate has been revoked by the foundation.", badge: "Revoked" },
};

function VerifyCertificate() {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ status: VerifyStatus; record?: Row } | null>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(verifyCertificate(query, state.certificates as Row[]) as { status: VerifyStatus; record?: Row });
  };

  return (
    <SiteLayout>
      <section className="relative">
        <img src={education} alt="" className="absolute inset-0 h-64 w-full object-cover md:h-72" />
        <div className="absolute inset-0 h-64 bg-hero-overlay md:h-72" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-primary-foreground md:py-20">
          <h1 className="text-4xl font-semibold md:text-5xl">Verify Certificate</h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">Enter the certificate number printed at the bottom-left of the certificate (e.g. KF-CERT-2026-0001).</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={check} className="card-soft flex flex-wrap items-end gap-3 p-6">
          <div className="min-w-[240px] flex-1"><Field label="Certificate Number *"><input value={query} onChange={(e) => setQuery(e.target.value)} required className="input-field" placeholder="KF-CERT-2026-0001" /></Field></div>
          <button className="btn btn-primary"><Icon name="award" className="h-4 w-4" />Verify</button>
        </form>

        {result && (
          <div className="mt-8">
            <div className="card-soft flex flex-wrap items-center gap-4 p-6">
              <Badge>{statusCopy[result.status].badge}</Badge>
              <p className="flex-1 font-semibold">{statusCopy[result.status].label}</p>
            </div>
            {result.record ? (
              <div className="card-soft mt-4 p-8">
                <PrintBar />
                <div className="print-area"><Certificate c={result.record} f={state.foundation as unknown as Record<string, string>} /></div>
              </div>
            ) : <div className="mt-4"><EmptyState text="Double-check the number and try again, or contact the foundation office." /></div>}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
