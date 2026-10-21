import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { PageHero, Field, Modal, EmptyState } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import { Receipt, PrintBar } from "@/components/documents";
import { inr } from "@/utils/verify";
import type { Row } from "@/context/StoreContext";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Kranjal Foundation" },
      { name: "description", content: "Sponsor a child's education, fund village health camps or empower women entrepreneurs — every rupee is tracked with 80G tax exemption." },
      { property: "og:title", content: "Donate — Kranjal Foundation" },
      { property: "og:description", content: "Every rupee is tracked. 80G tax exemption available." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Donate,
});

function Donate() {
  const { state, add } = useStore();
  const [receipt, setReceipt] = useState<Row | null>(null);
  const f = state.foundation;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const amount = Number(fd.get("amount") || 0);
    if (!amount || amount <= 0) return;
    const row = add("donations", {
      receipt: `KF-RCPT-${1000 + state.donations.length + 1}`,
      donor: String(fd.get("donor") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      amount,
      campaign: String(fd.get("campaign") || ""),
      method: String(fd.get("method") || "UPI"),
      status: "Success",
      date: new Date().toISOString().slice(0, 10),
      pan: String(fd.get("pan") || ""),
    });
    (e.target as HTMLFormElement).reset();
    setReceipt(row);
  };

  return (
    <SiteLayout>
      <PageHero title="Donate" text="Every rupee goes where you send it — and we send you the proof." image={hero} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-center text-3xl font-semibold">Active Campaigns</h2>
        {state.campaigns.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {state.campaigns.map((c) => {
              const pct = Math.min(100, Math.round((c.raised / c.goal) * 100));
              return (
                <div key={c.id} className="card-soft card-hover flex flex-col overflow-hidden">
                  <img src={c.image ? (c.image.startsWith("http") ? c.image : undefined) ?? `/images/${c.image}.jpg` : undefined} alt="" className="hidden" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-gradient-warm" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-3 flex justify-between text-sm">
                      <span className="font-bold text-primary">{inr(c.raised)} raised</span>
                      <span className="text-muted-foreground">{pct}% of {inr(c.goal)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : <EmptyState text="No active campaigns yet." />}
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <form onSubmit={submit} className="card-soft grid gap-5 p-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <h2 className="text-2xl font-semibold">Make a Donation</h2>
            <p className="mt-1 text-sm text-muted-foreground">Eligible for tax exemption under Section 80G ({f.certificate80G}).</p>
          </div>
          <Field label="Full Name *"><input name="donor" required className="input-field" /></Field>
          <Field label="Email *"><input name="email" type="email" required className="input-field" /></Field>
          <Field label="Phone"><input name="phone" className="input-field" /></Field>
          <Field label="PAN (for 80G receipt)"><input name="pan" className="input-field uppercase" /></Field>
          <Field label="Amount (₹) *"><input name="amount" type="number" min={1} required className="input-field" /></Field>
          <Field label="Campaign">
            <select name="campaign" className="input-field">
              <option>General Fund</option>
              {state.campaigns.map((c) => <option key={c.id}>{c.title}</option>)}
            </select>
          </Field>
          <Field label="Payment Method">
            <select name="method" className="input-field"><option>UPI</option><option>Card</option><option>Net Banking</option><option>Bank Transfer</option></select>
          </Field>
          <div className="sm:col-span-2 flex justify-end"><button className="btn btn-accent"><Icon name="heart" className="h-4 w-4" />Donate Now</button></div>
        </form>
      </section>

      <Modal open={!!receipt} onClose={() => setReceipt(null)} title="Thank you for your donation!" wide>
        <PrintBar />
        <div className="print-area"><Receipt d={receipt as Row} f={f as unknown as Record<string, string>} /></div>
      </Modal>
    </SiteLayout>
  );
}
