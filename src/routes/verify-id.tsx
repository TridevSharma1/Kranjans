import { useState } from "react";
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

const statusCopy: Record<VerifyStatus, { label: string; badge: string }> = {
  valid: { label: "Valid — this identity card is genuine and active.", badge: "Valid" },
  invalid: { label: "Invalid — no identity card matches this number.", badge: "Invalid" },
  expired: { label: "Expired — this identity card has passed its validity date.", badge: "Expired" },
  revoked: { label: "Revoked — this identity card has been revoked by the foundation.", badge: "Revoked" },
};

function VerifyId() {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<{ status: VerifyStatus; record?: Row } | null>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(verifyIdCard(query, state.employees as Row[]) as { status: VerifyStatus; record?: Row });
  };

  return (
    <SiteLayout>
      <section className="relative">
        <img src={health} alt="" className="absolute inset-0 h-64 w-full object-cover md:h-72" />
        <div className="absolute inset-0 h-64 bg-hero-overlay md:h-72" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 text-primary-foreground md:py-20">
          <h1 className="text-4xl font-semibold md:text-5xl">Verify ID Card</h1>
          <p className="mt-3 max-w-xl text-lg opacity-90">Enter the card number (e.g. EMP-0001) or QR code value printed on the back of the card.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <form onSubmit={check} className="card-soft flex flex-wrap items-end gap-3 p-6">
          <div className="min-w-[240px] flex-1"><Field label="Card or QR Number *"><input value={query} onChange={(e) => setQuery(e.target.value)} required className="input-field" placeholder="EMP-0001 or QR-EMP-0001" /></Field></div>
          <button className="btn btn-primary"><Icon name="shield" className="h-4 w-4" />Verify</button>
        </form>

        {result && (
          <div className="mt-8">
            <div className="card-soft flex flex-wrap items-center gap-4 p-6">
              <Badge>{statusCopy[result.status].badge}</Badge>
              <p className="flex-1 font-semibold">{statusCopy[result.status].label}</p>
            </div>
            {result.record ? (
              <>
                <div className="card-soft mt-4 flex flex-wrap items-center gap-4 p-6">
                  <Avatar name={result.record.name} photo={result.record.photo} size="h-14 w-14" />
                  <div className="flex-1">
                    <p className="text-lg font-bold">{result.record.name}</p>
                    <p className="text-sm text-muted-foreground">{result.record.designation} · {result.record.department}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p><span className="text-muted-foreground">Card No. </span><span className="font-bold">{result.record.id}</span></p>
                    <p><span className="text-muted-foreground">Valid till </span><span className="font-bold">{fmtDate(result.record.cardExpiry)}</span></p>
                  </div>
                </div>
                <div className="card-soft mt-4 p-8">
                  <PrintBar />
                  <div className="print-area"><IdCard e={result.record} f={state.foundation as unknown as Record<string, string>} /></div>
                </div>
              </>
            ) : <div className="mt-4"><EmptyState text="Double-check the number and try again, or contact the foundation office." /></div>}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
