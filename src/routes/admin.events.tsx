import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { DataTable, RowActions } from "@/components/DataTable";
import { StatusPill } from "@/components/StatusPill";
import { useStore } from "@/context/StoreContext";
import { imageOptions } from "@/utils/images";
import { fmtDate } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/events")({
  head: () => pageMeta("Events", "Manage events and registrations."),
  component: Events,
});

function Events() {
  const { state, remove } = useStore();
  return (
    <div className="space-y-10">
      <CrudPage title="Events" subtitle="Upcoming and past events shown on the website." collection="events" defaults={{ status: "Upcoming", image: "hero" }}
        fields={[
          { name: "title", label: "Title", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "location", label: "Location", required: true },
          { name: "category", label: "Category" },
          { name: "image", label: "Image", type: "select", options: imageOptions },
          { name: "status", label: "Status", type: "select", options: ["Upcoming", "Completed"] },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        filters={[{ key: "status", label: "Status", options: ["Upcoming", "Completed"] }]}
        columns={[
          { key: "title", label: "Title", render: (r) => <span className="font-semibold">{r.title}</span> },
          { key: "date", label: "Date", render: (r) => fmtDate(r.date) },
          { key: "location", label: "Location" },
          { key: "registrations", label: "Registrations", sortable: false, render: (r) => state.eventRegistrations.filter((x) => x.eventId === r.id).length },
          { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
        ]}
      />
      <div>
        <h2 className="mb-4 text-xl font-semibold">Event registrations</h2>
        <DataTable rows={state.eventRegistrations}
          columns={[{ key: "eventTitle", label: "Event" }, { key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "phone", label: "Phone" }, { key: "date", label: "Date", render: (r) => fmtDate(r.date) }]}
          actions={(r) => <RowActions onDelete={() => remove("eventRegistrations", r.id)} />}
        />
      </div>
    </div>
  );
}
