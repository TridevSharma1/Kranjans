import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/designations")({
  head: () => pageMeta("Designations", "Manage job designations."),
  component: () => (
    <CrudPage title="Designations" subtitle="Job titles and seniority levels." collection="designations"
      fields={[{ name: "title", label: "Title", required: true }, { name: "level", label: "Level", type: "select", options: ["Junior", "Mid", "Senior"], required: true }]}
      filters={[{ key: "level", label: "Levels", options: ["Junior", "Mid", "Senior"] }]}
      columns={[{ key: "title", label: "Title", render: (r) => <span className="font-semibold">{r.title}</span> }, { key: "level", label: "Level" }]}
    />
  ),
});
