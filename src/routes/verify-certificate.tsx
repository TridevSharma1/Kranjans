import { useEffect, useState } from "react";
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
  valid: { label: "Valid — This certificate is genuine, authentic, and currently valid in our official records.", badge: "Valid" },
  invalid: { label: "Invalid — No certificate matches this number in our registry.", badge: "Invalid" },
  expired: { label: "Expired — This certificate has passed its validity / expiry date.", badge: "Expired" },
  revoked: { label: "Revoked — This certificate has been revoked by the foundation authorities.", badge: "Revoked" },
};

function VerifyCertificate() {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ status: VerifyStatus; record?: Row } | null>(null);

  const performCheck = (val: string) => {
    if (!val.trim()) return;
    setResult(verifyCertificate(val, state.certificates as Row[]) as { status: VerifyStatus; record?: Row });
  };

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    performCheck(query);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("number") || params.get("q") || params.get("cert");
      if (q) {
        setQuery(q);
        performCheck(q);
      }
    }
  }, [state.certificates]);

  return (
    <SiteLayout>
      <section className="relative">
        <img src={education} alt="" className="absolute inset-0 h-64 w-full object-cover md:h-72" />
        <div className="absolute inset-0 h-64 bg-hero-overlay md:h-72" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-primary-foreground md:py-20">
          <h1 className="text-4xl font-semibold md:text-5xl">Verify Certificate</h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">Enter the certificate number printed at the bottom-left of the certificate (e.g. KF-CERT-2026-0001) to verify authenticity.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <form onSubmit={check} className="card-soft flex flex-wrap items-end gap-3 p-6 shadow-md">
          <div className="min-w-[240px] flex-1">
            <Field label="Certificate Number *">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="input-field"
                placeholder="KF-CERT-2026-0001"
              />
            </Field>
          </div>
          <button className="btn btn-primary">
            <Icon name="award" className="h-4 w-4" />Verify Certificate
          </button>
        </form>

        {/* Quick Test Demo Helpers */}
        <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs text-muted-foreground">
          <span>Quick test samples:</span>
          <button
            type="button"
            onClick={() => { setQuery("KF-CERT-2026-0001"); performCheck("KF-CERT-2026-0001"); }}
            className="rounded-full bg-mint px-2.5 py-1 font-bold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            KF-CERT-2026-0001 (Valid)
          </button>
          <button
            type="button"
            onClick={() => { setQuery("KF-CERT-2025-0020"); performCheck("KF-CERT-2025-0020"); }}
            className="rounded-full bg-destructive/10 px-2.5 py-1 font-bold text-destructive hover:bg-destructive hover:text-white transition-colors"
          >
            KF-CERT-2025-0020 (Revoked)
          </button>
          <button
            type="button"
            onClick={() => { setQuery("KF-CERT-INVALID"); performCheck("KF-CERT-INVALID"); }}
            className="rounded-full bg-muted px-2.5 py-1 font-semibold hover:bg-slate-300 transition-colors"
          >
            KF-CERT-INVALID (Invalid)
          </button>
        </div>

        {result && (
          <div className="mt-8 transition-all">
            <div className="card-soft flex flex-wrap items-center gap-4 p-6 border-l-4 border-l-primary">
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${result.status === "valid" ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : result.status === "revoked" ? "bg-rose-100 text-rose-800 border border-rose-300" : "bg-amber-100 text-amber-800 border border-amber-300"}`}>
                {statusCopy[result.status].badge}
              </span>
              <p className="flex-1 font-semibold text-foreground">{statusCopy[result.status].label}</p>
            </div>

            {result.record ? (
              <div className="card-soft mt-6 p-8">
                <div className="mb-4 flex items-center justify-between border-b pb-3">
                  <h3 className="font-semibold text-lg">Verified Certificate</h3>
                  <PrintBar />
                </div>
                <div className="print-area">
                  <Certificate c={result.record} f={state.foundation as unknown as Record<string, string>} />
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <EmptyState text="Double-check the certificate number and try again, or contact the Kranjal Foundation administration office." />
              </div>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
