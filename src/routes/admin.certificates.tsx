import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { Certificate, PrintBar } from "@/components/documents";
import { Modal } from "@/components/ui";
import { useStore, type Row } from "@/context/StoreContext";
import { fmtDate } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/certificates")({
  head: () => pageMeta("Certificates", "Issue and manage certificates."),
  component: Certificates,
});

const types = ["Volunteer Certificate", "Internship Certificate", "Training Certificate", "Participation Certificate", "Experience Certificate", "Appreciation Certificate", "Custom Certificate"];

function Certificates() {
  const { state } = useStore();
  const [view, setView] = useState<Row | null>(null);
  const year = new Date().getFullYear();
  return (
    <>
      <CrudPage title="Certificates" subtitle="Generate verifiable certificates with unique numbers." collection="certificates" onView={setView}
        defaults={{ issueDate: new Date().toISOString().slice(0, 10), status: "Valid", number: `KF-CERT-${year}-${String(state.certificates.length + 1).padStart(4, "0")}` }}
        fields={[
          { name: "number", label: "Certificate Number", required: true },
          { name: "type", label: "Type", type: "select", options: types, required: true },
          { name: "recipient", label: "Recipient", required: true },
          { name: "employeeId", label: "Linked Employee", type: "select", options: state.employees.map((e) => e.id) },
          { name: "issueDate", label: "Issue Date", type: "date", required: true },
          { name: "expiryDate", label: "Expiry Date (optional)", type: "date" },
          { name: "status", label: "Status", type: "select", options: ["Valid", "Revoked"] },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        filters={[{ key: "type", label: "Types", options: types }, { key: "status", label: "Status", options: ["Valid", "Revoked"] }]}
        columns={[
          { key: "number", label: "Number" },
          { key: "type", label: "Type" },
          { key: "recipient", label: "Recipient", render: (r) => <span className="font-semibold">{r.recipient}</span> },
          { key: "issueDate", label: "Issued", render: (r) => fmtDate(r.issueDate) },
          { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
        ]}
      />
      <Modal open={!!view} onClose={() => setView(null)} title="Certificate Preview" wide>
        {view && <div className="print-area"><PrintBar /><Certificate c={view} f={state.foundation} /></div>}
      </Modal>
    </>
  );
}
