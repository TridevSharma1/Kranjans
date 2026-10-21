import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { Receipt, PrintBar } from "@/components/documents";
import { Modal, StatCard } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore, type Row } from "@/context/StoreContext";
import { downloadCSV, fmtDate, inr } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/donations")({
  head: () => pageMeta("Donations", "Track donations, donors and receipts."),
  component: Donations,
});

const methods = ["UPI", "Card", "Net Banking", "Cash", "Cheque"];
const statuses = ["Success", "Pending", "Failed"];

function Donations() {
  const { state } = useStore();
  const [view, setView] = useState<Row | null>(null);
  const ok = state.donations.filter((d) => d.status === "Success");
  const total = ok.reduce((s, d) => s + Number(d.amount), 0);
  const donors = new Set(state.donations.map((d) => d.email)).size;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="money" label="Total Raised" value={inr(total)} />
        <StatCard icon="users" label="Unique Donors" value={donors} tone="bg-gradient-warm" />
        <StatCard icon="check" label="Successful" value={ok.length} />
        <StatCard icon="chart" label="Average Gift" value={inr(Math.round(total / (ok.length || 1)))} tone="bg-gradient-warm" />
      </div>
      <CrudPage title="Donations" subtitle="All donations with receipts and payment status." collection="donations" onView={setView}
        defaults={{ date: new Date().toISOString().slice(0, 10), status: "Success", method: "UPI", receipt: `KF-RCPT-${1001 + state.donations.length}` }}
        toolbar={<button className="btn btn-ghost btn-sm" onClick={() => downloadCSV("donations.csv", state.donations)}><Icon name="download" className="h-4 w-4" />CSV</button>}
        fields={[
          { name: "receipt", label: "Receipt Number", required: true },
          { name: "donor", label: "Donor Name", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "phone", label: "Phone" },
          { name: "amount", label: "Amount (₹)", type: "number", required: true },
          { name: "campaign", label: "Campaign", type: "select", options: state.campaigns.map((c) => c.title), required: true },
          { name: "method", label: "Payment Method", type: "select", options: methods },
          { name: "status", label: "Status", type: "select", options: statuses },
          { name: "date", label: "Date", type: "date" },
          { name: "pan", label: "PAN (for 80G)" },
        ]}
        filters={[{ key: "status", label: "Status", options: statuses }, { key: "method", label: "Methods", options: methods }, { key: "campaign", label: "Campaigns", options: state.campaigns.map((c) => c.title) }]}
        columns={[
          { key: "receipt", label: "Receipt" },
          { key: "donor", label: "Donor", render: (r) => <span className="font-semibold">{r.donor}</span> },
          { key: "amount", label: "Amount", render: (r) => inr(r.amount) },
          { key: "campaign", label: "Campaign" },
          { key: "method", label: "Method" },
          { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
          { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
        ]}
      />
      <Modal open={!!view} onClose={() => setView(null)} title="Donation Receipt" wide>
        {view && <div className="print-area"><PrintBar /><Receipt d={view} f={state.foundation} /></div>}
      </Modal>
    </div>
  );
}
