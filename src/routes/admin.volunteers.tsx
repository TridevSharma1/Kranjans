import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { useStore } from "@/context/StoreContext";
import { fmtDate } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/volunteers")({
  head: () => pageMeta("Volunteers", "Review volunteer applications."),
  component: Volunteers,
});

function Volunteers() {
  const { update } = useStore();
  return (
    <CrudPage title="Volunteers" subtitle="Applications submitted from the Volunteer page." collection="volunteers" defaults={{ status: "Pending", date: new Date().toISOString().slice(0, 10) }}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", required: true },
        { name: "skills", label: "Skills" },
        { name: "availability", label: "Availability", type: "select", options: ["Weekdays", "Weekends", "Monthly", "Flexible"] },
        { name: "interest", label: "Interest" },
        { name: "status", label: "Status", type: "select", options: ["Pending", "Approved", "Rejected"] },
        { name: "address", label: "Address", type: "textarea" },
      ]}
      filters={[{ key: "status", label: "Status", options: ["Pending", "Approved", "Rejected"] }]}
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-semibold">{r.name}</span> },
        { key: "phone", label: "Phone" },
        { key: "skills", label: "Skills" },
        { key: "interest", label: "Interest" },
        { key: "date", label: "Applied", render: (r) => fmtDate(r.date) },
        { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
      ]}
      extraActions={(r) => r.status === "Pending" ? (
        <>
          <button className="btn btn-primary btn-sm" onClick={() => update("volunteers", r.id, { status: "Approved" })}>Approve</button>
          <button className="btn btn-ghost btn-sm" onClick={() => update("volunteers", r.id, { status: "Rejected" })}>Reject</button>
        </>
      ) : null}
    />
  );
}
