import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { DataTable, RowActions } from "@/components/DataTable";
import { StatusPill } from "@/components/StatusPill";
import { Receipt, PrintBar } from "@/components/documents";
import { Modal, StatCard } from "@/components/ui";
import { useMember } from "@/hooks/use-member";
import type { Row } from "@/context/StoreContext";
import { fmtDate, inr } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/user/donations")({
  head: () => pageMeta("My Donations", "Your donation history and receipts."),
  component: MyDonations,
});

function MyDonations() {
  const { donations, foundation } = useMember();
  const [view, setView] = useState<Row | null>(null);
  const ok = donations.filter((d) => d.status === "Success");
  const total = ok.reduce((s, d) => s + Number(d.amount), 0);
  return (
    <div className="space-y-6">
      <PageTitle title="My Donations" subtitle="Your giving history and 80G receipts." action={<Link to="/donate" className="btn btn-primary">Donate again</Link>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon="money" label="Total Given" value={inr(total)} />
        <StatCard icon="check" label="Donations" value={ok.length} tone="bg-gradient-warm" />
        <StatCard icon="target" label="Campaigns Supported" value={new Set(ok.map((d) => d.campaign)).size} />
      </div>
      <DataTable rows={donations}
        columns={[
          { key: "receipt", label: "Receipt" },
          { key: "campaign", label: "Campaign" },
          { key: "amount", label: "Amount", render: (r) => inr(r.amount) },
          { key: "method", label: "Method" },
          { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
          { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
        ]}
        actions={(r) => <RowActions onView={() => setView(r)} />}
      />
      <Modal open={!!view} onClose={() => setView(null)} title="Donation Receipt" wide>
        {view && <div className="print-area"><PrintBar /><Receipt d={view} f={foundation} /></div>}
      </Modal>
    </div>
  );
}
