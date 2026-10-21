import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable } from "@/components/DataTable";
import { PageTitle } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { IdCard, PrintBar } from "@/components/documents";
import { Modal } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore, type Row } from "@/context/StoreContext";
import { fmtDate, isExpired } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/id-cards")({
  head: () => pageMeta("ID Cards", "Generate and print employee ID cards."),
  component: IdCards,
});

function IdCards() {
  const { state, update } = useStore();
  const [view, setView] = useState<Row | null>(null);
  return (
    <div>
      <PageTitle title="ID Cards" subtitle="Generate front & back ID cards with QR verification." />
      <DataTable rows={state.employees}
        filters={[{ key: "cardStatus", label: "Card Status", options: ["Active", "Revoked"] }]}
        columns={[
          { key: "id", label: "Card No." },
          { key: "name", label: "Employee" },
          { key: "designation", label: "Designation" },
          { key: "cardExpiry", label: "Expiry", render: (r) => fmtDate(r.cardExpiry) },
          { key: "cardStatus", label: "Status", render: (r) => <StatusPill value={r.cardStatus === "Active" && isExpired(r.cardExpiry) ? "Expired" : r.cardStatus} /> },
        ]}
        actions={(r) => (
          <div className="inline-flex gap-2">
            <button className="btn btn-ghost btn-sm" onClick={() => update("employees", r.id, { cardStatus: r.cardStatus === "Revoked" ? "Active" : "Revoked" })}>{r.cardStatus === "Revoked" ? "Reactivate" : "Revoke"}</button>
            <button className="btn btn-primary btn-sm" onClick={() => setView(r)}><Icon name="id" className="h-4 w-4" />Generate</button>
          </div>
        )}
      />
      <Modal open={!!view} onClose={() => setView(null)} title="Employee ID Card" wide>
        {view && <div className="print-area"><PrintBar /><IdCard e={view} f={state.foundation} /></div>}
      </Modal>
    </div>
  );
}
