import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable, RowActions } from "@/components/DataTable";
import { PageTitle } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { Modal } from "@/components/ui";
import { useStore, type Row } from "@/context/StoreContext";
import { fmtDate } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/messages")({
  head: () => pageMeta("Messages", "Contact form enquiries."),
  component: Messages,
});

function Messages() {
  const { state, update, remove } = useStore();
  const [view, setView] = useState<Row | null>(null);
  return (
    <div>
      <PageTitle title="Messages" subtitle="Enquiries sent through the Contact page." />
      <DataTable rows={state.messages}
        filters={[{ key: "status", label: "Status", options: ["New", "Resolved"] }]}
        columns={[
          { key: "name", label: "Name", render: (r) => <span className="font-semibold">{r.name}</span> },
          { key: "email", label: "Email" },
          { key: "subject", label: "Subject" },
          { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
          { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
        ]}
        actions={(r) => <RowActions onView={() => { setView(r); update("messages", r.id, { status: "Resolved" }); }} onDelete={() => remove("messages", r.id)} />}
      />
      <Modal open={!!view} onClose={() => setView(null)} title={view?.subject || "Message"}>
        {view && <div className="space-y-2 text-sm"><p><b>{view.name}</b> · {view.email} · {view.phone}</p><p className="whitespace-pre-wrap rounded-xl bg-muted p-4">{view.message}</p></div>}
      </Modal>
    </div>
  );
}
