import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { Field, Badge, EmptyState, Avatar } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import { IdCard, PrintBar } from "@/components/documents";
import { verifyIdCard, fmtDate, type VerifyStatus } from "@/utils/verify";
import type { Row } from "@/context/StoreContext";
import health from "@/assets/health.jpg";

export const Route = createFileRoute("/verify-id")({
  head: () => ({
    meta: [
      { title: "Verify ID Card — Kranjal Foundation" },
      { name: "description", content: "Verify the authenticity of any Kranjal Foundation employee identity card by card or QR number." },
      { property: "og:title", content: "Verify ID Card — Kranjal Foundation" },
      { property: "og:description", content: "Verify any employee identity card by its number." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyId,
});

const statusCopy: Record<VerifyStatus, { label: string; badge: string; color: string }> = {
  valid: { label: "Valid — This identity card is genuine and active in our verified records.", badge: "Valid", color: "bg-emerald-500 text-white" },
  invalid: { label: "Invalid — No identity card matches this number in our database.", badge: "Invalid", color: "bg-rose-500 text-white" },
  expired: { label: "Expired — This identity card has passed its registered validity date.", badge: "Expired", color: "bg-amber-500 text-white" },
  revoked: { label: "Revoked — This identity card has been revoked by Kranjal Foundation management.", badge: "Revoked", color: "bg-destructive text-white" },
};

function VerifyId() {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ status: VerifyStatus; record?: Row } | null>(null);

  const performCheck = (val: string) => {
    if (!val.trim()) return;
    setResult(verifyIdCard(val, state.employees as Row[]) as { status: VerifyStatus; record?: Row });
  };

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    performCheck(query);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("id") || params.get("q") || params.get("qr");
      if (q) {
        setQuery(q);
        performCheck(q);
      }
    }
  }, [state.employees]);

  return (
    <SiteLayout>
      <section className="relative">
        <img src={health} alt="" className="absolute inset-0 h-64 w-full object-cover md:h-72" />
        <div className="absolute inset-0 h-64 bg-hero-overlay md:h-72" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-primary-foreground md:py-20">
          <h1 className="text-4xl font-semibold md:text-5xl">Verify ID Card</h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">Enter the card number (e.g. EMP-0001) or QR code value printed on the back of the card to check real-time status.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <form onSubmit={check} className="card-soft flex flex-wrap items-end gap-3 p-6 shadow-md">
          <div className="min-w-[240px] flex-1">
            <Field label="Card or QR Number *">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="input-field"
                placeholder="EMP-0001 or QR-EMP-0001"
              />
            </Field>
          </div>
          <button className="btn btn-primary">
            <Icon name="shield" className="h-4 w-4" />Verify Identity
          </button>
        </form>

        {/* Quick Test Demo Helpers */}
        <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs text-muted-foreground">
          <span>Quick test samples:</span>
          <button
            type="button"
            onClick={() => { setQuery("EMP-0001"); performCheck("EMP-0001"); }}
            className="rounded-full bg-mint px-2.5 py-1 font-bold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            EMP-0001 (Valid)
          </button>
          <button
            type="button"
            onClick={() => { setQuery("EMP-0007"); performCheck("EMP-0007"); }}
            className="rounded-full bg-destructive/10 px-2.5 py-1 font-bold text-destructive hover:bg-destructive hover:text-white transition-colors"
          >
            EMP-0007 (Revoked)
          </button>
          <button
            type="button"
            onClick={() => { setQuery("EMP-9999"); performCheck("EMP-9999"); }}
            className="rounded-full bg-muted px-2.5 py-1 font-semibold hover:bg-slate-300 transition-colors"
          >
            EMP-9999 (Invalid)
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
              <>
                <div className="card-soft mt-4 flex flex-wrap items-center gap-4 p-6">
                  <Avatar name={result.record.name} photo={result.record.photo} size="h-16 w-16" />
                  <div className="flex-1">
                    <p className="text-xl font-bold">{result.record.name}</p>
                    <p className="text-sm font-semibold text-primary">{result.record.designation}</p>
                    <p className="text-xs text-muted-foreground">{result.record.department} Department</p>
                  </div>
                  <div className="text-right text-sm">
                    <p><span className="text-muted-foreground">Card No: </span><span className="font-bold">{result.record.id}</span></p>
                    <p><span className="text-muted-foreground">Joined: </span><span className="font-bold">{fmtDate(result.record.joiningDate)}</span></p>
                    <p><span className="text-muted-foreground">Valid till: </span><span className="font-bold">{fmtDate(result.record.cardExpiry)}</span></p>
                  </div>
                </div>

                <div className="card-soft mt-6 p-8">
                  <div className="mb-4 flex items-center justify-between border-b pb-3">
                    <h3 className="font-semibold text-lg">Official ID Card Preview</h3>
                    <PrintBar />
                  </div>
                  <div className="print-area">
                    <IdCard e={result.record} f={state.foundation as unknown as Record<string, string>} />
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <EmptyState text="Double-check the number and try again, or contact the Kranjal Foundation administration office." />
              </div>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
